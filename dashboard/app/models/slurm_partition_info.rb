class SlurmPartitionInfo
  PARTITION_ENTRY = "partition"
  GROUPS_ENTRY = "allowgroups"
  DEFAULT_ENTRY = "default="

  def initialize(configFilePath = '/etc/slurm/slurm.conf')
    @file_path = configFilePath
    @partitions = {}
    @partitions_by_group = Hash.new { |hash, key| hash[key] = [] }
    @default_partition = ""

    Rails.logger.info "Reading slurm config: #{@file_path}"
    if File.readable?(@file_path)
      parseFile
      indexByGroup
      Rails.logger.info "Slurm config partitions=#{@partitions.length} groups=#{@partitions_by_group.length}"
    else
      Rails.logger.error("Unable to access slurm config: #{@file_path}. Defaulting to empty configuration")
    end
  end

  def to_s
    super
    puts "Slurm Partition Info. Default=#{@default_partition} Partitions=#{@partitions}"
  end

  def get_partitions(group_names)
    groups_array = group_names.is_a?(Array) ? group_names : [group_names]
    user_partitions = groups_array.map {|group_name| @partitions_by_group.fetch(group_name, [])}.flatten.uniq
    user_partitions.empty? ? [@default_partition] : user_partitions
  end

  private

  def indexByGroup
    @partitions.each do |partition_name, groups|
      groups.each { |group_name| @partitions_by_group[group_name].push(partition_name)}
    end
  end

  def parseFile
    configuration_statement = ""
    File.foreach(@file_path) do |file_line|
      #JOIN MULTILINE CONFIG ITEMS. THESE ARE SPLIT INTO MULTIPLE LINES USING "\"
      configuration_statement = configuration_statement + file_line.chomp.gsub("\\", "")
      if !file_line.include? "\\"
        #CONFIGURATION STATEMENT COMPLETED
        if configuration_statement.downcase.start_with? PARTITION_ENTRY
          @partitions = @partitions.merge parsePartition(configuration_statement)
        end
        #RESET AND CONTINUE WITH NEXT STATEMENT
        configuration_statement = ""
      end
    end

  end

  def parsePartition(partitionLine)
    partitionInfo = partitionLine.split(" ")
    name_item = partitionInfo.select { | item | item.downcase.start_with?(PARTITION_ENTRY) }[0]
    groups_item = partitionInfo.select { | item | item.downcase.start_with?(GROUPS_ENTRY) }[0]
    default_item = partitionInfo.select { | item | item.downcase.start_with?(DEFAULT_ENTRY) }[0]

    partition_name = getValues(name_item)[0]
    @default_partition = partition_name if default_item && getValues(default_item)[0].downcase == "yes"
    groups = groups_item ? getValues(groups_item) : []
    result = {}
    result[partition_name] = groups
    return result
  end

  #RETURNS HASH WITH {name: [value1, value2]} FROM name=value1,value2,value3 STRING
  def getValues(name_value_pair)
    name, value_items = name_value_pair.split("=")
    value_items.split(",")
  end
end