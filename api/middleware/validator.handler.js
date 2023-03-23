const boom = require('@hapi/boom')

function validatorHandler(schema, property) {

  // * Creamos un middleware de forma dinamica (closure)
  return (req, res, next) => {
    const data = req[property];
    /**
     * * De esta forma lo hacemos dinamico ya que tambien se podria colocar asi
     * * req.body -> patch
     * * req.params -> get
     * * req.query -> Es en caso de tamaño que se requiera y puede ser para otras cosas
     */

    // * Usamos destructuracion para obtener el error

    const { error } = schema.validate(data)
    // * Se lo pasamos por next para que los middleware que procesan los errores lo identifiquen
    if (error) {
      next(boom.badRequest(error))
    }
    next();
  }
}

module.exports = validatorHandler;
