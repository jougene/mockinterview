.PHONY: test bin logs

install:
	docker-compose run app npm install

start: migrate
	docker-compose up -d

shell:
	docker-compose exec app bash

logs:
	docker-compose logs -f app

migrate:
	docker-compose run app npm run migrate

repl:
	docker-compose exec app npm run repl
