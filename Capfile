# default deploy_config_path is 'config/deploy.rb'
set :deploy_config_path, 'cap/deploy.rb'

# default stage_config_path is 'config/deploy'
set :stage_config_path, 'cap/stages'

# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# Include tasks from other gems included in your Gemfile
require 'json'
require 'bunny'
require 'mongo'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("cap/tasks/*.rake").each { |r| import r }
