ARG PYTHON_VERSION=3.14-slim

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

LABEL andasy_launch_runtime="python-app"

# install psycopg2 dependencies.
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /code

WORKDIR /code

COPY requirements.txt /tmp/requirements.txt
RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/
COPY . /code

ENV SECRET_KEY "hgkJRjsyCxrcJe62GkMo9CkFvDgB4BCwTuqsJv0dNJsKYKyH6W"
RUN python manage.py collectstatic --noinput

EXPOSE 8080

CMD python manage.py migrate && gunicorn --bind :8080 --workers 2 core.wsgi