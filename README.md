# DataWheel

## Requirements

- [Java 8+](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Postgres](https://www.postgresql.org/docs/9.4/static/tutorial-install.html)
- [NodeJS](https://nodejs.org)
- [Docker](https://www.docker.com/get-started) (optional)

## Development

This application was developed using Spring boot for backend, ReactJS for the UI and PostgreSQL for persisting data.

### Setup

1. Install [NodeJS](https://nodejs.org)
2. Install [Java 8+](https://www.oracle.com/java/technologies/javase-downloads.html)
3. Install [Postgres](https://www.postgresql.org/docs/9.4/static/tutorial-install.html)

Clone this repo

```shell script
$ git clone https://github.com/<username>/datawheel.git
$ cd datawheel
```

Install dependencies

```shell script
$ npm install
$ ./gradlew
```

#### Run the app

Before running the app ensure you have created a database in postgres. The application uses `datawheel_db` by default.

You can update the datasource settings in `src/main/resources/application.yml`.

```shell script
$ ./gradlew bootRun
```

This command builds the static files for the UI using webpack and start the server.

### Running with Docker

To build docker image of the application

```shell script
$ ./gradlew clean bootJar jibDockerBuild
```

Start the application via docker-compose

```shell script
$ docker-compose -f src/main/docker/app.yml up -d datawheel-app
```

We've added a Makefile to execute the above steps with one command.

```shell script
$ make start
```

To stop the application

```shell script
$ docker-compose -f src/main/docker/app.yml down --remove-orphan
```

or

```shell script
$ make stop
```
