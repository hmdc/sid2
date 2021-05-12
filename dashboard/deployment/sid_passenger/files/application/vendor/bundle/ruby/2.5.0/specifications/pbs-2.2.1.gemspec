# -*- encoding: utf-8 -*-
# stub: pbs 2.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "pbs".freeze
  s.version = "2.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jeremy Nicklas".freeze]
  s.bindir = "exe".freeze
  s.date = "2018-09-14"
  s.description = "Ruby wrapper for the Torque C library utilizing Ruby-FFI. This has been successfully tested with Torque 4.2.10 and greater. Your mileage may vary.".freeze
  s.email = ["jnicklas@osc.edu".freeze]
  s.homepage = "https://github.com/OSC/pbs-ruby".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.2.0".freeze)
  s.rubygems_version = "2.7.6.2".freeze
  s.summary = "Ruby gem that uses FFI to interface with Adaptive Computing's resource manager Torque".freeze

  s.installed_by_version = "2.7.6.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<ffi>.freeze, [">= 1.9.6", "~> 1.9"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.7"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<pry>.freeze, ["~> 0.10"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.7"])
    else
      s.add_dependency(%q<ffi>.freeze, [">= 1.9.6", "~> 1.9"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.7"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<pry>.freeze, ["~> 0.10"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.7"])
    end
  else
    s.add_dependency(%q<ffi>.freeze, [">= 1.9.6", "~> 1.9"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.7"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<pry>.freeze, ["~> 0.10"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.7"])
  end
end
