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