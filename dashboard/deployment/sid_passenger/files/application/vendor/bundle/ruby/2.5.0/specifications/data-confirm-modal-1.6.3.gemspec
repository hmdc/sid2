# -*- encoding: utf-8 -*-
# stub: data-confirm-modal 1.6.3 ruby lib

Gem::Specification.new do |s|
  s.name = "data-confirm-modal".freeze
  s.version = "1.6.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Marcello Barnaba".freeze]
  s.date = "2020-02-24"
  s.description = "This gem overrides Rails' UJS behaviour to open up a Bootstrap Modal instead of the browser's built in confirm() dialog".freeze
  s.email = ["vjt@openssl.it".freeze]
  s.homepage = "http://github.com/ifad/data-confirm-modal".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.7.6.2".freeze
  s.summary = "Use bootstrap modals with Rails' UJS data-confirm".freeze

  s.installed_by_version = "2.7.6.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>.freeze, [">= 3.0"])
    else
      s.add_dependency(%q<railties>.freeze, [">= 3.0"])
    end
  else
    s.add_dependency(%q<railties>.freeze, [">= 3.0"])
  end
end
