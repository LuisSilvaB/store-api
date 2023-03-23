const express = require('express');
const ProductService = require('../services/product.service.js')
const validatorHandler = require('../middleware/validator.handler')
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schemas.js')

const router = express.Router();

// ? Creamos una instancia del servicio
const service = new ProductService();


router.get('/', async(req, res)=>{
  const productos = await service.find();
  // * Usando limit para generar un limite de productos
  const { size } = req.query;
  res.json(productos)
})

router.get('/filter',async(req,res) => {
  res.send('Hola soy un filter')
} )

router.get('/:id',
    // Usamos el creador del middleware le pasamos -> Schema, y donde va a encontrar la informacion
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
      try{
        // * Esto es destructuración indicando que solo importa el id
        const { id } = req.params;
        // ! Recordar que los parametros se envian en un string
        const oneProduct = await service.findOne(id)
        res.status(200).json(oneProduct)
          if(id === '999'){
            res.status(404).json({
              message: 'Not Found'
            })
          }
          else{
          }
      }
      catch(error){
        next(error)
      }
  }
)
// * Metodo post
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async(req, res) => {
  // * Aqui es donde vamos a almacenar lo que viene de insomnia
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct)
})

router.patch('/:id',

  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async(req,res) => {
    try {
      //* Captura del id
      const { id } = req.params;
      //* Captura de la informacion
      const body = req.body;
      const productUpdate = await service.update(id, body)

      res.json(productUpdate)

    } catch (error) {
      res.status(404).send(error.message);
    }

})

router.delete('/:id', async(req,res) => {
  //* Captura del id
  const { id } = req.params;
  //* Captura de la informacion
  const productDelete = await service.delete(id)
})

module.exports = router;
