const express = require("express");
const router = express.Router();

// Importamos el modelo Concesionario desde la carpeta "modelos"
const Concesionario = require("../modelos/modeloConcesionario");

// Ruta para obtener todos los concesionarios
router.get("/", async (req, res) => {
  try {
    // Utilizamos el modelo Concesionario para obtener todos los concesionarios de la base de datos
    const concesionarios = await Concesionario.find();
    res.json(concesionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un solo concesionario por su ID
router.get("/:id", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    // Utilizamos el modelo Concesionario para obtener un concesionario específico de la base de datos
    const concesionario = await Concesionario.findById(idConcesionario);
    res.json(concesionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo concesionario
router.post("/", async (req, res) => {
  try {
    // Creamos una nueva instancia del modelo Concesionario con los datos del cuerpo de la solicitud
    const nuevoConcesionario = new Concesionario(req.body);
    // Guardamos el nuevo concesionario en la base de datos
    await nuevoConcesionario.save();
    res.json({ message: "Concesionario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un concesionario por su ID
router.put("/:id", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    // Utilizamos el modelo Concesionario para actualizar un concesionario específico de la base de datos
    await Concesionario.findByIdAndUpdate(idConcesionario, req.body);
    res.json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para borrar un concesionario por su ID
router.delete("/:id", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    // Utilizamos el modelo Concesionario para borrar un concesionario específico de la base de datos
    await Concesionario.findByIdAndDelete(idConcesionario);
    res.json({ message: "Concesionario borrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
