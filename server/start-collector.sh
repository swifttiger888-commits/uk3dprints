#!/bin/bash
# UK3D Prints — starts collector + cloudflare tunnel
# This script is managed by systemd. The tunnel URL is printed to stdout
# on startup; update functions/api/interest.js if it changes.

COLLECTOR_PORT=9877

# Start the Python collector in background
python3 /opt/uk3dprints-web/server/collect.py &
COLLECTOR_PID=$!

# Wait for collector to be ready
for i in $(seq 1 10); do
  if curl -sf http://localhost:$COLLECTOR_PORT/ > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Start Cloudflare Tunnel (named tunnel — stable URL)
exec cloudflared tunnel run uk3d-collector
