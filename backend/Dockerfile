FROM python:3.6.8

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /srv/backend
WORKDIR /srv/backend

COPY requirements.txt /srv/backend/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /srv/backend/

# EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
