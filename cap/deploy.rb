# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'web-audits'
set :docker_username, 'benoitquette'
set :repo_url, 'git@gitlab.com:benoit.quette/web-audits.git'
set :default_config_file, 'config/config.json'
set :package_file, 'package.json'
set :queues, fetch(:queues, []).push('store-mongo', 'audit-performance-gpsi', 'audit-search-basic')
set :keep_releases, 10
set :linked_dirs, fetch(:linked_dirs, []).push('ngrok')

after "deploy:updated", "tools:copy_config_file"
after "deploy:updated", "tools:load_app_version"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/config.json', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
