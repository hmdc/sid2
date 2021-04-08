class Ws::WsPartitionsController < ApplicationController

  def get
    user_group_names = @user.groups.map {| g | g.name }
    user_partitions = ::Configuration.slurm_partition_info.get_partitions(user_group_names)

    render json: { uname: @user.name, groups: user_group_names, partitions: user_partitions }

  rescue => error
    logger.error "action=getPartitions user=#{@user} error=#{error}"
    render json: { message: error }, status: :internal_server_error
  end
end