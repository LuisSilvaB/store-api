const { isBoom } = require("@hapi/boom");
const { json } = require("express");

// * Middeware para hacer log a los errores
// * se encarga de capturar cualquier error

function logErrors(err,req,res,next) {
  console.error(err);
  next(err);
}

//* Middeware para dar formato a los errores

function errorHandler(err,req,res,next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

//* Dandole formato al boom
function errorHandlerBoom(err,req,res,next) {
  if (err.isBoom) {
    // * Boom maneja toda la informacion en el output
    const {output} = err;
    // * Aqui hacemos que el status sea dinamico
    // * Todo lo del json va desde output.payload
    res.status(output.statusCode).json(output.payload)
  }
  //* Caso contrario que ejecute un middleware de error normal
  next(err);
}

module.exports = { logErrors, errorHandler, errorHandlerBoom }
