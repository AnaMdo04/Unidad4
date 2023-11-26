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

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos la estructura de datos de confesionario

let concesionarios = [
  {
    nombre: "Concesionario1",
    direccion: "Dirección1",
    coches: [
      { modelo: "Corsa", cv: 120, precio: 15000 },
      { modelo: "Astra", cv: 150, precio: 20000 },
    ],
  },
  {
    nombre: "Concesionario2",
    direccion: "Dirección2",
    coches: [
      { modelo: "Clio", cv: 100, precio: 12000 },
      { modelo: "Megane", cv: 130, precio: 18000 },
    ],
  },
];

// Listamos todos los concesionarios

app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Creamos un nuevo concesionario

app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "ok" });
});

// Obtenemos un solo concesionario por su ID
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});

// Actualizamos un concesionario por su ID
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "ok" });
});

// Borramos un concesionario por su ID
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios = concesionarios.filter((_, index) => index != id);
  response.json({ message: "ok" });
});

// Obtenemos todos los coches de un concesionario por su ID
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const cochesConcesionario = concesionarios[id].coches;
  response.json(cochesConcesionario);
});

// Añadimos un nuevo coche a un concesionario por su ID
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  concesionarios[id].coches.push(request.body);
  response.json({ message: "ok" });
});

// Obtenemos un solo coche de un concesionario por su ID y el ID del coche
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const coche = concesionarios[id].coches[cocheId];
  response.json({ coche });
});

// Actualizamos un coche de un concesionario por su ID y el ID del coche
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  concesionarios[id].coches[cocheId] = request.body;
  response.json({ message: "ok" });
});
