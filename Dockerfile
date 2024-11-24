FROM python:3.9
EXPOSE 8000
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./backend /code/backend
COPY ./frontend /code/frontend

WORKDIR /code/backend
CMD ["uvicorn", "main:app"]