const mongoose = require("mongoose");

const cocheSchema = new mongoose.Schema({
  modelo: String,
  cv: Number,
  precio: Number,
});

const concesionarioSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  coches: [cocheSchema],
});

// Exporta el modelo Concesionario
const Concesionario = mongoose.model("Concesionario", concesionarioSchema);
module.exports = Concesionario;
