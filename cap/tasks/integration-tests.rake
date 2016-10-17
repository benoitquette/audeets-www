namespace :integration_tests do

    desc "Run all the integration tests"
    task :run do
        on roles(:docker) do |host|
            tunnels = fetch(:tunnels)

            # sleep to let all services start
            sleep(60)

            # check the rabbitmq queues
            rabbitmq_tunnel_uri = tunnels["rabbitmq"]
            rabbitmq_tunnel_uri.scheme = "amqp"
            conn = Bunny.new(rabbitmq_tunnel_uri.to_s)
            conn.start
            queues = fetch(:queues)
            queues.each do |queue|
                if !conn.queue_exists?(queue)
                    raise "Queue '#{queue}' does not exist on rabbitmq instance '#{rabbitmq_tunnel_uri.to_s}'"
                end
            end
            conn.close

            # check that mongo is up
            mongo_tunnel_uri = tunnels["mongo"]
            client = Mongo::Client.new([ mongo_tunnel_uri.host + ':' + mongo_tunnel_uri.port.to_s ], :database => 'web-audits')
            #database = client.database
            #database.collection_names.each { |collection| puts collection }
            #unless @client.database.include?(horse)
            #   @suggested_horses << horse
            #end

        end
    end
end

