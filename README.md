## For development

npm run start:dev

## Setup for production

npm run build

## Delete the 'node_modules' directory

rm -rf node_modules

## Install production-only dependencies without changing the lock file

npm ci --omit=dev

## Start the app using it's 'main' entry

node .
