require "rest_client"

class RequestTrackerClient
  #THIS CLIENT IS BASED ON https://github.com/uidzip/rt-client

  def self.create
    rt_config = ::Configuration.request_tracker_config

    new({
          server: rt_config[:server],
          user: rt_config[:user],
          pass: rt_config[:pass],
          auth_token: rt_config[:auth_token],
          timeout: rt_config[:timeout],
          verify_ssl: rt_config[:verify_ssl],
        })
  end

  UA = "IQSS ruby RT Client"
  attr_reader :server, :resource, :timeout, :verify_ssl

  def initialize(config)
    #DEFAULTS
    @auth_token = nil
    @timeout = 30
    @verify_ssl = false
    #FROM CONFIGURATION
    @user = config[:user]
    @pass = config[:pass]
    @auth_token = config[:auth_token]
    @timeout = config[:timeout] if config[:timeout]
    @verify_ssl = config[:verify_ssl] if config[:verify_ssl]
    if config[:server]
      @server = config[:server]
      @server += "/" if @server !~ /\/$/
      @resource = "#{@server}REST/1.0/"
    end

    if !@server
      raise ArgumentError, "server is a required option for RT client"
    end

    if !@auth_token && (!@user || !@pass)
      raise ArgumentError, "user and pass are required if not auth_token is provided for RT client"
    end

    if !@auth_token && !@user && !@pass
      raise ArgumentError, "auth_token or user and pass are required options for RT client"
    end

    headers = { 'User-Agent'   => UA,
                'Cookie'       => "" }
    headers['Authorization'] = "Token #{@auth_token}" if @auth_token

    @rt_client = RestClient::Resource.new(@resource, :headers => headers, :timeout => @timeout, :verify_ssl => @verify_ssl)
    self.untaint
  end

  def create(field_hash)
    field_hash[:id] = "ticket/new"
    payload = compose(field_hash)
    resp = @rt_client["ticket/new/edit"].post payload
    new_id = resp.match(/Ticket\s*(\d+)/)
    if new_id.class == MatchData
      return new_id[1]
    else
      raise "Unable to create ticket. Server response: #{resp}"
    end
  end


  def compose(fields)
    payload = { :multipart => true }

    if fields.has_key? :Attachment
      filenames = fields[:Attachment].split(',')
      attachment_num = 1
      filenames.each do |f|
        payload["attachment_#{attachment_num.to_s}"] = File.new(f)
        attachment_num += 1
      end
      fields[:Attachment] = filenames.map {|f| File.basename(f)}.join(',')
    end

    if fields.has_key? :Attachments
      attachments = fields[:Attachments]
      attachment_num = 1
      attachments.each do |request_file|
        payload["attachment_#{attachment_num.to_s}"] = File.new(request_file.tempfile)
        attachment_num += 1
      end
      fields[:Attachment] =attachments.map {|request_file| request_file.original_filename}.join(',')
      fields.delete :Attachments
    end

    if fields.has_key? :Text
      # insert a space on continuation lines.
      fields[:Text].gsub!(/\n/,"\n ")
    end

    field_array = fields.map { |k,v| "#{k}: #{v}" }
    content = field_array.join("\n")
    payload["content"] = content
    if !@auth_token
      payload["user"] = @user
      payload["pass"] = @pass
    end


    return payload
  end

end