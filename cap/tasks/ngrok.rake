namespace :ngrok do

    desc "Kill all ngrok processes linked to the application"
    task :stop_tunnels do
        on roles(:docker) do |host|
            application = fetch(:application)
            pids = capture("ps ax -o'pid command' | grep ngrok | grep #{application} | grep -v grep | awk '{print $1}' | tr \"\\n\" ' '")
            puts "ngrok processes: #{pids}"
            pids_list = pids.split(",")
            pids.split(",").each do |pid|
                execute "kill -9 #{pid}"
            end
        end
    end

    desc "Start all the tunnels define in the ngrok config file "
    task :start_tunnels do
        on roles(:docker) do |host|
            ngrok_path = "#{release_path}/ngrok"
            log_dir = "#{release_path}/log"
            ngrok_config_file = fetch(:ngrok_config_file)
            config_path = File.join(release_path, ngrok_config_file)
            log_path = "#{log_dir}/ngrok.log"

            # ensure ngrok is not already running
            Rake::Task["ngrok:stop_tunnels"].invoke
            Rake::Task["ngrok:stop_tunnels"].reenable

            # start client
            execute "mkdir #{log_dir}"
            execute "#{ngrok_path}/ngrok start --all --log=stdout --config #{config_path} > #{log_path} &"
            execute "cat #{log_path}"

            # wait for 5s and get the tunnels public URLs
            sleep(5)
            tunnels_info = capture("curl http://localhost:4040/api/tunnels")
            json = JSON.parse(tunnels_info)
            urls = {}
            json["tunnels"].each do |tunnel|
               urls[tunnel["name"]] = URI(tunnel["public_url"])
            end
            set :tunnels, urls
        end
    end

end