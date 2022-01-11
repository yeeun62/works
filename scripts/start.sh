#!/bin/bash
cd /home/ubuntu/template/server

authbind --deep pm2 start app.js