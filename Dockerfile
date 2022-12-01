FROM php:8.0-apache

WORKDIR /var/www/html

# RUN apt-get update && apt-get upgrade -y
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

COPY php.ini /usr/local/etc/php/conf.d/php.ini

EXPOSE 80

