# SINAI

## Rqueriments

* Docker compose
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
    (check ports used: sudo ss -tulpn | grep LISTEN)


## Set up Dev Environment

### With Docker
1. Up docker dev container: `make up-dev`
2. Enter postgres container: `docker compose -f docker-compose.dev.yml exec postgres sh`
3. Enter postgres: `su - postgres`
4. Seed db data: `gunzip -c sinai_dev.gz | psql sinai_dev`
5. Exit postgres: `exit`
6. Exit container: `exit`

**Use `make help` to see all docker commands available**

### Without Docker
1. Install dependencies: `npm install`
2. Configure prisma client: `npx prisma migrate dev`
3. Enter postgres: `su - postgres`
4. Seed db data: `gunzip -c sinai_dev.gz | psql sinai_dev`
5. Exit postgres: `exit`
6. Exit container: `exit`
7. Run & Open app: `npm run dev -- --open`


## Production Deployment

**Use production branch**: `git checkout production`

1. Up docker prod container: `make up`
2. Enter postgres container: `docker compose -f docker-compose.yml exec postgres sh`
3. Enter postgres: `su - postgres`
4. Restore migrated data: `gunzip -c sinai.gz | psql sinai`
5. Exit postgres: `exit`
6. Exit container: `exit`

### Test production (wihtout Docker)
1. Build app: `npm run build`
2. Preview: `npm run preview`

### Update production deployment
1. Pull changes: `git pull`
2. Backup data
3. Update docker container: `make update`

***Note***: If the update not works properly, try cleanning all cache `make clean`

## Backup DB data

1. Enter postgres container: `docker compose -f docker-compose.yml exec postgres sh`
2. Enter postgres: `su - postgres`
3. Dump database: `pg_dump --column-inserts --data-only  sinai | gzip > sinai.gz`
4. Exit postgres: `exit`
5. Exit container: `exit`
6. Copy dump from container: `sudo docker cp postgres:/var/lib/postgresql/sinai.gz ./sinai.gz`
