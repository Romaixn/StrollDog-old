#!/bin/sh

# Update Docker images
docker compose pull
docker compose build

# Update deps
docker compose run php composer update
docker compose run client /bin/sh -c 'pnpm install; pnpm update'

# Update the Symfony skeleton
cd api
composer sync-recipes --force

echo 'Run `git diff` and carefully inspect the changes made by the recipes.'
echo 'Run `docker compose up --build --force-recreate` now and check that everything is fine!'
