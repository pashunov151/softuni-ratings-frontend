FROM nginx:stable-alpine
COPY dist/ratings-frontend /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/nginx.conf
COPY deployment/nginx-start.sh /nginx-start.sh
CMD ["/bin/sh", "/nginx-start.sh"]
