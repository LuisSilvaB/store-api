const express = require('express');
const cors = require('cors') // * Sirve para dar permiso a los clientes
// * Esportamos la funcion al colocarlo de esta forma por defecto buscará el index.js
const routerApi = require('./routes')

// * Traemos las dos funciones

const { logErrors, errorHandler, errorHandlerBoom } = require('./middleware/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// * Solucion al cors 1

app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
      next();
    });

const whiteList = ['http://localhost:8080', 'https://myapps.com', 'http://127.0.0.1:5500'],
 options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      // * Le indicamos si con el 'true' que el acceso esta permitido y con el 'null' el mensaje
      callback(null, true)
    } else {
      callback(new Error('Acceso no permitido'))
    }
  }
}
app.use(cors(options));

routerApi(app);

// * Para de definir los middleware de errores se deben hacer despues del routing
// * Uno se ejecuta despues de otro

app.use(logErrors);
app.use(errorHandlerBoom)
app.use(errorHandler);

// // ! Uso del res
// /*
//  * se puede usar el send para mensajes
//  * pero en para el envio en la mayoria de cosos se hace uso de json
// */

app.get('/api', (req, res)=>{
  res.send('Hola desde mi server en express')
})


// app.get('/categorias/:categoriaId/products/:productsId', (req,res) => {
//   const { categoriaId, productsId} = req.params;
//   res.json(
//       {
//         categoriaId,
//         productsId,
//       }
//     )

// });



app.listen(port, () => {
  console.log('Mi port ' + port);
});
