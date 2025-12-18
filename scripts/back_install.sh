#!/bin/bash
set -e

APP_DIR="/opt/a086126-back"
SERVICE_FILE="/etc/systemd/system/a086126-back.service"
ENV_FILE="/etc/sysconfig/a086126-back"

mkdir -p "$APP_DIR"
chown -R ec2-user:ec2-user "$APP_DIR"
chmod 755 "$APP_DIR"

if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" << 'EOF'
#SPRING_PROFILES_ACTIVE=prod
#JWT_SECRET=change_me
EOF
  chmod 600 "$ENV_FILE"
fi

cat > "$SERVICE_FILE" << 'EOF'
[Unit]
Description=a086126 Spring Boot Backend
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/a086126-back
EnvironmentFile=-/etc/sysconfig/a086126-back
ExecStart=/usr/bin/java -jar /opt/a086126-back/app.jar
Restart=always
RestartSec=3
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable a086126-back.service
