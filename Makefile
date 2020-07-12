ENV=$(env)
ifndef env
ENV=dev
endif

ifeq ($(filter $(ENV), dev prod),)
$(error Invalid environment variable: $(env))
endif

.PHONY: build stop

APP_COMPOSE_FILE := "src/main/docker/app.yml"

start-test-db:
	@(docker-compose -f $(APP_COMPOSE_FILE) up -d db_test)

run-test: start-test-db
	@(./gradlew test)

stop:
	@(docker-compose -f $(APP_COMPOSE_FILE) down --remove-orphan)

build:
	$(info Make: Building $(ENV) environment images.)
	@(./gradlew -P$(ENV) clean bootJar jibDockerBuild)

run-start: build
	@(docker-compose -f $(APP_COMPOSE_FILE) up datawheel-app)

test:
	bash -c "trap 'docker-compose -f $(APP_COMPOSE_FILE) down --remove-orphan' EXIT; $(MAKE) run-test"

start:
	bash -c "trap 'docker-compose -f $(APP_COMPOSE_FILE) down --remove-orphan' EXIT; $(MAKE) run-start"
