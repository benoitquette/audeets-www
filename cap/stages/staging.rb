# server-based syntax
# ======================
server "islay.homenet.org", user: "deploy", roles: %w{docker}, port: 2222, forward_agent: false

# Configuration
# =============
set :deploy_to, '/home/deploy/web-audits'
set :config_file_stage, 'config/config.staging.json'
set :docker_compose_file, 'docker-compose.yml'
set :ngrok_config_file, '/config/ngrok.yml'

# after "deploy:finishing", "docker:build"
after "deploy:finishing", "docker:run"
after "deploy:finishing", "ngrok:start_tunnels"
after "deploy:finishing", "integration_tests:run"
before "deploy:finished", "ngrok:stop_tunnels"
after "deploy:failed", "ngrok:stop_tunnels"
# after "deploy:finishing", "docker:push"

