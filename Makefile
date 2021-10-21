.PHONY: test bin logs

dc = docker-compose

install:
	$(dc) run app npm install

start: migrate
	docker-compose up -d

shell:
	docker-compose exec app bash

db.shell:
	$(dc) exec db psql -U interview

logs:
	docker-compose logs -f app

migrate:
	docker-compose run --rm app npm run migrate

seed:
	docker-compose run --rm app npm run seed

repl:
	docker-compose exec app npm run repl

repl.debug:
	docker-compose exec app npm run repl.debug

