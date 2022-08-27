# Executables (local)
DOCKER_COMP = docker compose

# Docker containers
PHP_CONT = $(DOCKER_COMP) exec php

# Executables
PHP      = $(PHP_CONT) php
COMPOSER = $(PHP_CONT) composer
SYMFONY  = $(PHP_CONT) bin/console

# Executables: vendors
PHPUNIT       = ./bin/phpunit
PHPSTAN       = ./vendor/bin/phpstan
PHP_CS_FIXER  = ./vendor/bin/php-cs-fixer
PHPMETRICS    = ./vendor/bin/phpmetrics

# Misc
.DEFAULT_GOAL = help
.PHONY        :

## —— 🎵 🐳 The Symfony Docker Makefile 🐳 🎵 ——————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Docker 🐳 ————————————————————————————————————————————————————————————————
build: ## Builds the Docker images
	@$(DOCKER_COMP) build --pull --no-cache

up: ## Start the docker hub in detached mode (no logs)
	@$(DOCKER_COMP) up --detach

start: build up ## Build and start the containers

down: ## Stop the docker hub
	@$(DOCKER_COMP) down --remove-orphans

logs: ## Show live logs
	@$(DOCKER_COMP) logs --tail=0 --follow

sh: ## Connect to the PHP FPM container
	@$(PHP_CONT) sh

## —— Composer 🧙 ——————————————————————————————————————————————————————————————
composer: ## Run composer, pass the parameter "c=" to run a given command, example: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	@$(COMPOSER) $(c)

vendor: ## Install vendors according to the current composer.lock file
vendor: c=install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction
vendor: composer

## —— Symfony 🎵 ———————————————————————————————————————————————————————————————
sf: ## List all Symfony commands or pass the parameter "c=" to run a given command, example: make sf c=about
	@$(eval c ?=)
	@$(SYMFONY) $(c)

cc: c=c:c ## Clear the cache
cc: sf

## —— Tests ✅ —————————————————————————————————————————————————————————————————
test: ## Run tests with optionnal suite and filter
	@$(eval testsuite ?= 'all')
	@$(eval filter ?= '.')
	@$(PHPUNIT) --testsuite=$(testsuite) --filter=$(filter) --stop-on-failure

test-all: ## Run all tests
	@$(PHP_CONT) $(PHPUNIT) --stop-on-failure

## —— Coding standards ✨ ——————————————————————————————————————————————————————
cs: lint-php ## Run all coding standards checks

static-analysis: stan ## Run the static analysis (PHPStan)

stan: ## Run PHPStan
	@$(PHP_CONT) $(PHPSTAN) analyse --memory-limit 1G

lint-php: ## Lint files with php-cs-fixer
	@$(PHP_CONT) $(PHP_CS_FIXER) fix --allow-risky=yes --dry-run

fix-php: ## Fix files with php-cs-fixer
	@$(PHP_CONT) $(PHP_CS_FIXER) fix --allow-risky=yes
