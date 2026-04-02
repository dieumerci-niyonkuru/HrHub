#!/bin/sh
echo "Running migrations..."
python manage.py migrate
echo "Creating superuser..."
python manage.py createsuperuser --noinput --email $DJANGO_SUPERUSER_EMAIL || true
echo "Starting server..."
gunicorn --bind :8080 --workers 2 core.wsgi
