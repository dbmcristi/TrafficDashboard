# TrafficDashboard
docker build --no-cache -t traffic-dashboard-be:4.0 .
docker tag traffic-dashboard-be:4.0 dbmcristi/traffic-dashboard-be:4.0
docker compose up -d