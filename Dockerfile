FROM python:2
RUN apt-get update && apt-get install -y nodejs

ADD static/ /app/static/
ADD templates/ /app/templates/
ADD http.py /app/
ADD requirements.txt /app/
ADD minify.py /app/
ADD deploy/config.yml /app/

WORKDIR /app

RUN ["pip", "install", "-r", "requirements.txt"]
RUN ["python", "minify.py"]

EXPOSE 80/tcp

ENTRYPOINT ["python", "http.py", "-m", "-p", "80"]