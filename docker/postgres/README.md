# PostgreSQL Initialization Scripts

This directory contains initialization scripts for the PostgreSQL database container.

## How It Works

The PostgreSQL Docker image automatically executes scripts placed in `/docker-entrypoint-initdb.d/`:
- Scripts run in alphabetical order
- Only executed on **first container initialization** (when data directory is empty)
- Supports `.sh`, `.sql`, and `.sql.gz` files

## init.sh

Creates the `we_love_sousse` database if it doesn't exist and grants privileges to the postgres user.

This approach is more reliable than using `POSTGRES_DB` environment variable because:
- Works without depending on `.env` file being present
- Idempotent (safe to run multiple times)
- Version controlled
- Standard PostgreSQL Docker pattern

## To Reset Database

If you need to re-run the init script:

```bash
# Stop and remove containers and volumes
docker-compose down -v

# Start fresh (init script will run)
docker-compose up -d
```
