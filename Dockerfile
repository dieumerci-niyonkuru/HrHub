FROM python:3.13-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Run migrations and collect static
RUN python manage.py migrate || true
RUN python manage.py collectstatic --noinput || true

# Expose port
EXPOSE 8000

# Start Gunicorn
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "120", "--log-level", "info"]
