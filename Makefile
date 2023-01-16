set-up: # Set up app after git clone
	@make cp-envfile
	@make build
	@make up
mkdir-app:
	mkdir api

cp-envfile:
	cp .env.example .env


# Commands for container
build:
	docker-compose build
up:
	docker-compose up -d
down:
	docker-compose down
restart:
	@make down
	@make build
	@make up
next:
	docker-compose exec next bash
app:
	docker-compose exec app sh
db:
	docker-compose exec db bash

# install:
# 	docker-compose exec 