const {Pool} = require('pg');
const { config } = require('../config/config.js')

//* Una buena practica es la proteccion de variables

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//* Creación de la url de conexión que mandan todos los servicios de almacenamiento no administrados
  //* Esta estructura se manda para recibir la conexion
const URL = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const pool = new Pool({connectionString: URL})

// const pool = new Pool({
//    host: '172.19.0.2',
//    port : 5432,
//    user: 'luis',
//    password: 'luis',
//    database: 'milis_cakes'
// })

module.exports = pool;
