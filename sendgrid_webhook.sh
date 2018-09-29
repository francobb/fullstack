#!/usr/bin/env bash
function localtunnel {
  lt -s uoheoihn87 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
