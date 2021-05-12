# -*- encoding: utf-8 -*-
# stub: bootstrap_form 2.7.0 ruby lib

Gem::Specification.new do |s|
  s.name = "bootstrap_form".freeze
  s.version = "2.7.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Stephen Potenza".freeze, "Carlos Lopes".freeze]
  s.date = "2017-04-21"
  s.description = "bootstrap_form is a rails form builder that makes it super easy to create beautiful-looking forms using Twitter Bootstrap 3+".freeze
  s.email = ["potenza@gmail.com".freeze, "carlos.el.lopes@gmail.com".freeze]
  s.homepage = "http://github.com/bootstrap-ruby/rails-bootstrap-forms".freeze
  s.rubygems_version = "2.7.6.2".freeze
  s.summary = "Rails form builder that makes it easy to style forms using Twitter Bootstrap 3+".freeze

  s.installed_by_version = "2.7.6.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<mime-types>.freeze, ["~> 2.6.2"])
      s.add_development_dependency(%q<rails>.freeze, [">= 4.0"])
      s.add_development_dependency(%q<sqlite3>.freeze, [">= 0"])
      s.add_development_dependency(%q<timecop>.freeze, ["~> 0.7.1"])
      s.add_development_dependency(%q<mocha>.freeze, [">= 0"])
      s.add_development_dependency(%q<appraisal>.freeze, [">= 0"])
      s.add_development_dependency(%q<equivalent-xml>.freeze, [">= 0"])
      s.add_development_dependency(%q<nokogiri>.freeze, [">= 0"])
      s.add_development_dependency(%q<diffy>.freeze, [">= 0"])
    else
      s.add_dependency(%q<mime-types>.freeze, ["~> 2.6.2"])
      s.add_dependency(%q<rails>.freeze, [">= 4.0"])
      s.add_dependency(%q<sqlite3>.freeze, [">= 0"])
      s.add_dependency(%q<timecop>.freeze, ["~> 0.7.1"])
      s.add_dependency(%q<mocha>.freeze, [">= 0"])
      s.add_dependency(%q<appraisal>.freeze, [">= 0"])
      s.add_dependency(%q<equivalent-xml>.freeze, [">= 0"])
      s.add_dependency(%q<nokogiri>.freeze, [">= 0"])
      s.add_dependency(%q<diffy>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<mime-types>.freeze, ["~> 2.6.2"])
    s.add_dependency(%q<rails>.freeze, [">= 4.0"])
    s.add_dependency(%q<sqlite3>.freeze, [">= 0"])
    s.add_dependency(%q<timecop>.freeze, ["~> 0.7.1"])
    s.add_dependency(%q<mocha>.freeze, [">= 0"])
    s.add_dependency(%q<appraisal>.freeze, [">= 0"])
    s.add_dependency(%q<equivalent-xml>.freeze, [">= 0"])
    s.add_dependency(%q<nokogiri>.freeze, [">= 0"])
    s.add_dependency(%q<diffy>.freeze, [">= 0"])
  end
end
