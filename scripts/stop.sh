#!/bin/bash
cd /home/ubuntu/template/server

sudo pm2 stop app.js 2> /dev/null || true
sudo pm2 delete app.js 2> /dev/null || true