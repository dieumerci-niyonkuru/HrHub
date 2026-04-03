#!/bin/sh
set -e
echo "Running migrations"
python manage.py migrate
echo "Creating superuser"
python manage.py shell -c "
from users.models import User
import os
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'dieumercin21@gmail.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'Admin@1234')
if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password, first_name='Admin', last_name='User')
    print('Superuser created')
else:
    print('Superuser exists')
"
echo "Starting server"
exec gunicorn --bind :8080 --workers 2 core.wsgi
