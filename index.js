/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

/* eslint-env node */ // Indica a ESLint que estamos usando Node.js y sus variables globales

// Importamos las bibliotecas necesarias.

// Concretamente el framework express.
const express = require("express");
const mongoose = require("mongoose");

// Importamos el modelo desde la carpeta "modelos"
const Concesionario = require("./modelos/modeloConcesionario");

// Importamos los routers desde la carpeta "routers"
const cocheRouter = require("./routers/coche");
const concesionarioRouter = require("./routers/concesionario");

// Inicializamos la aplicación
const app = express();

// Conexión a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/concesionariosDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a la base de datos:"));
db.once("open", () => {
  console.log("Conectado a la base de datos");
});

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Utilizamos los routers
app.use("/coches", cocheRouter);
app.use("/concesionarios", concesionarioRouter);

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});
