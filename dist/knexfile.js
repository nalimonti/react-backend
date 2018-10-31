'use strict';

// Update with your config settings.

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'react-backend'
        },
        migrations: {
            directory: __dirname + '/knex/migrations',
            tableName: 'migrations'
        }
    },
    staging: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'react-backend'
        },
        migrations: {
            directory: __dirname + '/knex/migrations',
            tableName: 'migrations'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'react-backend'
        },
        migrations: {
            directory: __dirname + '/knex/migrations',
            tableName: 'migrations'
        }
    }
};