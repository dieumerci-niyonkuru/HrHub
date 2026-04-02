#!/bin/bash
# Build React frontend
cd frontend
npm install
npm run build
cd ..

# Collect static files
python manage.py collectstatic --noinput
