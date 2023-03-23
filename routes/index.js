const express = require('express')
const productRoutes = require('../routes/products.router.js')
const usersRoutes = require('../routes/users.router.js')
const categoriesRoutes = require('../routes/categories.router.js')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1',router)
  //* Aqui definimos las rutas principales
    router.use('/products',productRoutes)
    router.use('/users',productRoutes)
    router.use('/categories',productRoutes)
}
module.exports = routerApi;
