#!/bin/bash
set -e

for i in {1..10}; do
  if curl -sf http://localhost:8080/actuator/health > /dev/null; then
    echo "Backend is healthy"
    exit 0
  fi
  sleep 3
done

echo "Backend health check failed"
exit 1
