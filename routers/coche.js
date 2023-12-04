const express = require("express");
const router = express.Router();

// Importamos el modelo Coche desde la carpeta "modelos"
const Coche = require("../modelos/modeloConcesionario");

// Ruta para obtener todos los coches de un concesionario por su ID
router.get("/:id/coches", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    // Utilizamos el modelo Coche para obtener todos los coches de un concesionario específico
    const coches = await Coche.find({ concesionario: idConcesionario });
    res.json(coches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un solo coche de un concesionario por su ID y el ID del coche
router.get("/:id/coches/:cocheId", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const cocheId = req.params.cocheId;
    // Utilizamos el modelo Coche para obtener un coche específico de un concesionario
    const coche = await Coche.findOne({ _id: cocheId, concesionario: idConcesionario });
    res.json({ coche });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo coche en un concesionario
router.post("/:id/coches", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    // Añadimos el ID del concesionario al cuerpo de la solicitud antes de crear el nuevo coche
    req.body.concesionario = idConcesionario;
    // Creamos una nueva instancia del modelo Coche con los datos del cuerpo de la solicitud
    const nuevoCoche = new Coche(req.body);
    // Guardamos el nuevo coche en la base de datos
    await nuevoCoche.save();
    res.json({ message: "Coche creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un coche de un concesionario por su ID y el ID del coche
router.put("/:id/coches/:cocheId", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const cocheId = req.params.cocheId;
    // Utilizamos el modelo Coche para actualizar un coche específico de un concesionario
    const resultado = await Coche.updateOne({ _id: cocheId, concesionario: idConcesionario }, req.body);
    res.json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para borrar un coche de un concesionario por su ID y el ID del coche
router.delete("/:id/coches/:cocheId", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const cocheId = req.params.cocheId;
    // Utilizamos el modelo Coche para borrar un coche específico de un concesionario
    const resultado = await Coche.deleteOne({ _id: cocheId, concesionario: idConcesionario });
    res.json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
