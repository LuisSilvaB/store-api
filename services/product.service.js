const faker = require('faker');
const boom = require('@hapi/boom');


class ProductService{

  constructor(){
    this.products = [];
    // * Cada vez que creamos una instancian en el constructor generará los productos
    this.generate();
  }

  // * Nos permite generar productos solo para este caso ya que no estamos conesctados a una bd
  generate(){
    const limit = 100; // *-> En este caso le desimo si no obtiene valor limite que por defecto sea 10
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(), // * -> Generación de nombres aleatorios
        precio: parseInt(faker.commerce.price() ,10), // * -> Generación de precios aleatorios
        img: faker.image.imageUrl(), // * -> Generación de imagenes aleatorias
        isBlock: faker.datatype.boolean(), // * -> retorno de elemnentos boolen apara indicar el bloqueo
      })
    };
  }

  //  *  Función para crear
  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.products.push(newProduct);
    return newProduct
  }
  //  *  Función para buscar
  async find(){
    return new Promise((resolve, reject) => {
        resolve(this.products)
    })
    // * Usando el find ya tendriamos la lista de productos

  }
  //  *  Función para buscar solo 1
  async findOne(id){
    // const name = this.geTotal();
    // ? El find te trae todo el objeto
    const producto =  this.products.find(producto => producto.id === id);
    // * Regla de negocio 1 -> (Producto no encontrado)
    if (!producto) {
      throw boom.notFound('Producto no encontrado')
    }
    // * Regla de negocio 2 -> (Producto bloqueado)
    if (producto.isBlock) {
      throw boom.conflict('Producto bloqueado')
    }
    return producto;
  }
  //  *  Función para actualizar
  async update(id, changes){
    // ? El findIndex te busca solo el index del objeto encontrado
    const index = this.products.findIndex(item => item.id === id);
    if (index == -1) {
      throw boom.notFound('Product not found')
    }

    // * Para la actualizacion usaremos el spreed operation
    // ?
    const producto = this.products[index];
    this.products[index] = {
      // * Aqui le estamos indicando que "persista" los atributos del producto original
      // * y que realice cambios solo en los campos que se obtuvieron cambios.
      ...producto,
      ...changes
    }
    return this.products[index];
  }

  // * Funcion para eliminar
  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index == -1) {
      throw new Error('product no found')
    }
    this.products.splice(index);
    return 'All ok'
  }
}

module.exports = ProductService;
