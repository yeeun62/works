#!/bin/bash
cd /home/ubuntu/template/server
sudo authbind --deep pm2 start app.js