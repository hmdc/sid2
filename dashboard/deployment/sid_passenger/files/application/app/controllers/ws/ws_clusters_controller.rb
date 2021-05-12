class Ws::WsClustersController < ApplicationController

  def get

    user_group_names = @user.groups.map {| g | g.name }

    #ONLY RETURN BASIC CLUSTER INFORMATION TO THE CLIENT
    clusters = ::Configuration.cluster_metadata.map {|metadata|
      {
        id: metadata.cluster_id,
        name: metadata.cluster_info.metadata_config[:title],
        adapter: metadata.cluster_info.job_config[:adapter],
        active: metadata.cluster_info.job_allow?,
        defaultPartition: metadata.default_partition,
        userPartitions: metadata.partitions(user_group_names),
      }
    }

    render json: { uname: @user.name, groups: user_group_names, clusters: clusters }

  rescue => error
    logger.error "action=getClusters user=#{@user} error=#{error}"
    render json: { message: error }, status: :internal_server_error
  end
end