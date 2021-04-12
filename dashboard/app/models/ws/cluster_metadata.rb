module Ws
  class ClusterMetadata

    def self.load
      OodAppkit.clusters.map do |cluster|
        partition_info = Ws::SlurmPartitionInfo.new(cluster.job_config[:conf]) if cluster.job_config[:adapter] && cluster.job_config[:adapter].to_sym == :slurm
        Ws::ClusterMetadata.new(cluster, partition_info)
      end
    end

    def initialize(cluster_info, partition_info)
      @cluster_info = cluster_info
      @partition_info = partition_info
    end

    def cluster_id
      @cluster_info.id.to_s
    end

    def cluster_info
      @cluster_info
    end

    def default_partition
      @partition_info.get_default_partition if @partition_info
    end

    def partitions(group_names)
      @partition_info.get_partitions(group_names) if @partition_info
    end

  end

end