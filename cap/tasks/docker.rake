namespace :docker do

    desc "Build docker image"
    task :build do
    on roles(:docker) do |host|
        image_name = fetch(:application)
        docker_username = fetch(:docker_username)
        app_version = fetch(:app_version)
        execute "cd #{deploy_to}/current && docker build --rm=true --no-cache=false -t #{docker_username}/#{image_name}:#{app_version} ."
    end
    end

    desc "Create and start the containers"
    task :run do
      on roles(:docker) do |host|
          execute "docker login -u benoit.quette@gmail.com -p danger98 registry.gitlab.com"
          execute "docker pull registry.gitlab.com/web-audits/web-audits"
          compose_file = fetch(:docker_compose_file)
          project_name = fetch(:application)
          app_version = fetch(:app_version)
          execute "cd #{release_path} && echo 'APP_VERSION=#{app_version}' >> .env"
          execute "cd #{deploy_to}/current && docker-compose -f #{compose_file} -p #{project_name} up --remove-orphans -d"
      end
    end

    desc "Push the docker image to the docker hub repository"
    task :push do
      on roles(:docker) do |host|
          image_name = fetch(:application)
          docker_username = fetch(:docker_username)
          execute "docker push #{docker_username}/#{image_name}"
      end
    end

end
