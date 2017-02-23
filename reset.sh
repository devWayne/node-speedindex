#!/usr/bin/env bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
#=================================================================#
#   System Required:  CentOS 6+, Debian 7+, Ubuntu 12+            #
#   Description: start X11 server and headless chrome             #
#   Author: Teddysun <i@teddysun.com>                             #
#=================================================================#
killall -v chrome
if [ $? -eq 0 ]; then
    echo "kill chrome success"
else
    echo "no chrome process"
fi
nohup xvfb-run --server-args='-screen 0, 375x667x16' google-chrome --remote-debugging-port=9222 --user-data-dir &
if [ $? -eq 0 ]; then
    echo "xvfb sever run successfully"
else
    echo "xvfb failed"
fi

