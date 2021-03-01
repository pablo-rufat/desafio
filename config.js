const { Pool, Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test_tw',
    password: 'root',
    port: 5432,
});

try {
    client.connect();
} catch (e) {
    console.log(e);
}

exports.client = client;