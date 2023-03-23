const express = require('express');

const router = express.Router();

router.get('/',(req, res) => {
  res('Estámos en el detalle');
})

module.exports = router;
