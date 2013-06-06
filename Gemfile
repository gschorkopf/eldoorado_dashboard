source 'https://rubygems.org'

gem 'rails', '3.2.13'
gem 'rest-client'
gem 'hashie' #figure out why this isnt a dependency in eldoorado
gem 'eldoorado'
gem 'gon'

group :production do
  gem 'pg'
end

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'd3_rails'
  gem 'bootstrap-sass'
end

group :development do
  gem "better_errors"
  gem 'binding_of_caller'
  gem 'sqlite3'
end

group :test do
  gem 'rspec-rails'
  gem 'simplecov', :require => false
  gem 'webmock'
  gem 'vcr'
end

gem 'jquery-rails'

# Use unicorn as the app server
gem 'unicorn'