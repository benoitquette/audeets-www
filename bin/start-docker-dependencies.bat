REM *** ensure that a docker machine named 'default' is running on the host
REM *** otherwise change the name 'default' below
REM FOR /f "tokens=*" %%i IN ('docker-machine env default') DO %%i
docker-compose -f docker-compose.yml -p web-audits up -d mongo rabbitmq elk elastic-search
