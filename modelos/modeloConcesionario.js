// Importamos la biblioteca mongoose
const mongoose = require("mongoose");

// Definimos el esquema para el modelo de concesionario, que incluye una lista de coches
const concesionarioSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  direccion: { type: String, require: true },
  coches: {
    type: [
      {
        modelo: { type: String, require: true },
        cv: { type: Number, require: true },
        precio: { type: Number, require: true },
      },
    ],
    require: true,
  },
});

// Creamos el modelo Concesionario a partir del esquema concesionarioSchema
const Concesionario = mongoose.model("Concesionario", concesionarioSchema);

// Exportamos el modelo Concesionario para que pueda ser utilizado en otros archivos
module.exports = Concesionario;
