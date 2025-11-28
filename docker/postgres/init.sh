#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT 'CREATE DATABASE we_love_sousse'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'we_love_sousse')\gexec
    
    GRANT ALL PRIVILEGES ON DATABASE we_love_sousse TO $POSTGRES_USER;
EOSQL

echo "Database 'we_love_sousse' initialized successfully"
