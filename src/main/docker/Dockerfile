FROM openjdk:8-jre-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JAVA_OPTS=""

# Add a datawheel user to run our application so that it doesn't need to run as root
RUN adduser -D -s /bin/sh datawheel
WORKDIR /home/datawheel

ADD entrypoint.sh entrypoint.sh
RUN chmod 755 entrypoint.sh && chown datawheel:datawheel entrypoint.sh
USER datawheel

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 8080

ADD *.war app.war

