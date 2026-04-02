#!/bin/sh
set -e
echo "=== Running migrations ==="
python manage.py migrate --run-syncdb
echo "=== Migrations done ==="
echo "=== Creating superuser ==="
python manage.py createsuperuser --noinput --email $DJANGO_SUPERUSER_EMAIL || echo "Superuser already exists"
echo "=== Starting server ==="
exec gunicorn --bind :8080 --workers 2 core.wsgi
