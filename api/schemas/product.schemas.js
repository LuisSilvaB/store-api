const joi = require('joi');

// * No le colocamos el requerido para tener el requerido o no
const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(15);
const price = joi.number().integer().min(10);

const createProductSchema =  joi.object({
  name: name.required(),
  price: price.required(),
});

const updateProductSchema =  joi.object({
  name: name,
  price: price,
});

const getProductSchema =  joi.object({
  id : id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
