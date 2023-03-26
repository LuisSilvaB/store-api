const express = require('express')
const productRoutes = require('../routes/products.router.js')
const usersRoutes = require('../routes/users.router.js')
const categoriesRoutes = require('../routes/categories.router.js')

//* Solucion al cors 2 - despliegue

const whiteList = ['http://localhost:8080', 'https://myapps.com', 'http://127.0.0.1:5500'],
 options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      // * Le indicamos si con el 'true' que el acceso esta permitido y con el 'null' el mensaje
      callback(null, true)
    } else {
      callback(new Error('Acceso no permitido'))
    }
  }
}



function routerApi(app) {
  const router = express.Router();

  router.use(cors(options));

  app.use('/api/v1',router)
  //* Aqui definimos las rutas principales
    router.use('/products',productRoutes)
    router.use('/users',productRoutes)
    router.use('/categories',productRoutes)
}
module.exports = routerApi;
