const express = require('express');
const router = express.Router();

/**
 * * Cuando le damos el plural a algún endpoint
 * * eso significa que la respuesta debe ser dada mediante un array
 */

  //? En este caso los parámetros son opcionales

router.get('/', (req, res) => {

  // * Aca le indicamos que se pasará desde una consulta
  // * En esta caso pasaremos los parametros limit y offset

  const { limit, offset } = req.query;
    if (limit && offset) {
      res.json(
          {
            limit,
            offset,
          }
        )
      }
    else{
      res.send(`<h1>No hay parámetros</h1>`)
    }
    }
  )
