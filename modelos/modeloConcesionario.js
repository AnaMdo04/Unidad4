// Importamos la biblioteca mongoose
const mongoose = require("mongoose");

// Definimos el esquema para el modelo de coche
const cocheSchema = new mongoose.Schema({
  modelo: String,
  cv: Number,
  precio: Number,
});

// Definimos el esquema para el modelo de concesionario, que incluye una lista de coches
const concesionarioSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  coches: [cocheSchema],
});

// Creamos el modelo Concesionario a partir del esquema concesionarioSchema
const Concesionario = mongoose.model("Concesionario", concesionarioSchema);

// Exportamos el modelo Concesionario para que pueda ser utilizado en otros archivos
module.exports = Concesionario;
