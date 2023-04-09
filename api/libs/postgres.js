const {Client} = require('pg');

async function getConnection(){
 const client = new Client({
   host: '172.19.0.3',
   port : 5431,
   user: 'luis',
   password: 'luis',
   database: 'myStore'
 })
 await client.connect();
 return client;
}

module.exports = getConnection;
