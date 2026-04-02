#!/usr/bin/env bash
set -o errexit
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --no-input --clear
python manage.py createsuperuser --noinput --email $DJANGO_SUPERUSER_EMAIL || true
