Rails.application.config.after_initialize do
  Rails.logger.info "Executing UserConfiguration extension ..."
  class UserConfiguration
    alias_method :ood_profile, :profile
  
    def profile
      if config.fetch(:group_based_profiles, false)
        groups = OodSupport::User.new.groups.map{|g| g.name.to_sym}
        group_profile = config.fetch(:profiles, {}).keys.select{|profile| groups.include?(profile)}.first
        Rails.logger.info "UserConfiguration extension group_profile=#{group_profile}"
  
        group_profile
      else
        ood_profile
      end
    end
  end

  Rails.logger.info "UserConfiguration extension completed"
end