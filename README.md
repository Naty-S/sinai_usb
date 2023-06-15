# SINAI

## Rqueriments

* Docker
* Nodejs
* Git

If you don't want to use Docker you need to install these aswell:
* postgres 14
* prisma


## Install & Configuration

1. install docker && nodejs && git
2. clone repo: `git clone https://github.com/Naty-S/sinai_usb.git`
3. set .env file: `cp .env.template .env`
  * Change `DOCKER_APP_NAME`, `PG_DB`, `DB_DUMP` variables to use dev resources
  * Change `PG_PORT` if you have postgres already running in the same port


## Set up Dev Environment

### With Docker
1. Up docker dev container: `make up-dev`
2. Enter postgres container: `docker compose -f docker-compose.dev.yml exec postgres sh`
3. Enter postgres: `su - postgres`
4. Seed db data: `gunzip -c sinai_dev.gz | psql sinai_dev`
5. Exit container

**Use `make help` to see all docker commands available**

### Without Docker
1. Install dependencies: `npm install`
2. Enter postgres: `su - postgres`
3. Create database: `createdb sinai_dev`
4. Seed db data: `gunzip -c sinai_dev.gz | psql sinai_dev`
5. Exit postgres
6. Configure prisma client: `npx prisma generate`
7. Run & Open app: `npm run dev -- --open`


## Production Deployment

**Use production branch**: `git checkout production`

1. Up docker dev container: `make up-dev`
2. Enter postgres container: `docker compose -f docker-compose.yml exec postgres sh`
3. Enter postgres: `su - postgres`
4. Seed db data: `gunzip -c sinai.gz | psql sinai`
5. Exit container

### Test production (wihtout Docker)
1. Build app: `npm run build`
2. Preview: `npm run preview`

### Update production deployment
1. Pull changes: `git pull`
2. Update docker container: `make update`


## Backup DB data

1. Enter postgres container: `docker compose -f docker-compose.yml exec postgres sh`
2. Enter postgres: `su - postgres`
3. Dump database: `pg_dump sinai | gzip > sinai.gz`
4. Exit container
5. Copy dump from container: `sudo docker cp postgres:/var/lib/postgresql/sinai.gz ./sinai.gz`
