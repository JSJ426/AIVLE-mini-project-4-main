# #!/bin/bash
# cd /home/ec2-user/back
# java -Xms512m -Xmx1024m -jar app.jar
#!/bin/bash
set -e
systemctl start a086126-back.service
systemctl status a086126-back.service --no-pager -l || true
