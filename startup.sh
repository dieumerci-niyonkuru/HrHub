#!/bin/sh
set -e
echo "Running migrations"
python manage.py migrate
echo "Creating superuser"
python manage.py shell -c "
from users.models import User
if not User.objects.filter(email='$DJANGO_SUPERUSER_EMAIL').exists():
    User.objects.create_superuser(email='$DJANGO_SUPERUSER_EMAIL', password='$DJANGO_SUPERUSER_PASSWORD', first_name='Admin', last_name='User')
    print('Superuser created!')
else:
    print('Superuser already exists')
"
echo "Starting server"
exec gunicorn --bind :8080 --workers 2 core.wsgi
