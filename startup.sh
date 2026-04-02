#!/bin/sh
set -e
echo "Running migrations"
python manage.py migrate
echo "Creating superuser"
python manage.py createsuperuser --noinput --email $DJANGO_SUPERUSER_EMAIL || echo "Superuser exists"
echo "Starting server"
exec gunicorn --bind :8080 --workers 2 core.wsgi
