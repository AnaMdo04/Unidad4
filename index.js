/**
 * Tres formas distintas de crear variables en javascript:
 *
 * let: se puede modificar
 * var: se puede modificar
 * const: es constante y no se puede modificar
 *
 */

const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

let coches = [
  { marca: "Renault", modelo: "Clio" },
  { marca: "Nissan", modelo: "Skyline R34" },
];

app.get("/coches", (request, response) => {
  response.json(coches);
});

app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "ok" });
});

app.get("/coches/:id", (request, response) => {
  const id = request.params.id;
  const result = coches[id];
  responde.json({ result });
});

app.put("/coc0hes/:id", (request, response) => {
  const id = request.params.id;
  coches[id] = request.body;
  response.json({ message: "ok" });
});

app.delete("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches = coches.filter((item) => coches.indexOf(item) !== id);
  response.json({ message: "ok" });
});
