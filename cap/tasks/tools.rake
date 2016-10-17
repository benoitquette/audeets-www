namespace :tools do

    desc "Duplicate and rename the config file according to the stage"
    task :copy_config_file do
        on roles(:docker) do |host|

            default_config_file = fetch(:default_config_file)
            config_file_stage = fetch(:config_file_stage)

            default_config_path = File.join(release_path, default_config_file)
            stage_config_path = File.join(release_path, config_file_stage)

            execute "rm #{default_config_path}"
            execute "mv #{stage_config_path} #{default_config_path}"

        end
    end

    desc "Extracts the application version number from package.json file"
    task :load_app_version do
        on roles(:docker) do |host|
            package_file = fetch(:package_file)
            file = File.open(package_file)
            contents = file.read
            file.close
            json = JSON.parse(contents)
            set :app_version, json["version"]
        end
    end

end
