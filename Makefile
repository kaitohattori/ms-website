APP_NAME = ms-website
EXTERNAL_APPS = postgresql ms-api ms-stream-api ms-recommendation-api

run: ## Run on local
	npm run dev

lint: ## Check codestyle
	npm run lint

docker-build: ## Build on docker
	docker build -t $(APP_NAME) .

docker-run: ## Run on docker
	docker run --rm \
		-p 3000:3000 \
		--name $(APP_NAME) \
		$(APP_NAME):latest

external-init: ## Initialize external apps
	rm -rf ./external-apps/assets
	rm -rf ./external-apps/logs

external-run: ## Run external apps
	docker-compose up -d $(EXTERNAL_APPS)

external-end: ## End external apps
	docker-compose down

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
