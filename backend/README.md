# Backend for vremezizki.si webpage


## How to add NodeJS application in Direct Admin

/domain/test-api.domain.com should exists
add private_html and public_html to /domain/test-api.domain.com

Configure Web Applications on Node.JS Selector

```
Application root : vremezizki/backend // Path to backend
Application url : test-api.vremezizki.si
Application startup file : build/passenger.js
Passenger log file : logs/backend.log
```

## .htaccess for Apache
Config example for Apache server to server from different port in subdomain.

```
# a2enmod proxy_wstunnel

RewriteEngine On

RewriteCond %{HTTP:UPGRADE} ^websocket$ [NC]
RewriteCond %{HTTP:CONNECTION} Upgrade$ [NC]
RewriteRule ^(.*) ws://localhost:3009/ [P]

RewriteRule ^(.*) http://localhost:3009/$1 [P]
```