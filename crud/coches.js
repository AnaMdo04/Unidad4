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

// Borramos un coche de un concesionario por su ID y el ID del coche
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  concesionarios[id].coches.splice(cocheId, 1);
  response.json({ message: "ok" });
});
