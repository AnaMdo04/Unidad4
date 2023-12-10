const express = require("express");
const router = express.Router();
const Concesionario = require("../modelos/modeloConcesionario");

// Obtener todos los concesionarios
router.get("/", async (req, res) => {
  try {
    const concesionarios = await Concesionario.find();
    res.json(concesionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un concesionario por su ID
router.get("/:id", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const concesionario = await Concesionario.findById(idConcesionario);
    res.json(concesionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo concesionario
router.post("/", async (req, res) => {
  try {
    const nuevoConcesionario = new Concesionario(req.body);
    await nuevoConcesionario.save();
    res.status(201).json({ message: "Concesionario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un concesionario por su ID
router.put("/:id", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    await Concesionario.findByIdAndUpdate(idConcesionario, req.body, { new: true });
    res.json({ message: "Concesionario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Borrar un concesionario por su ID
router.delete("/:id", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    await Concesionario.findByIdAndDelete(idConcesionario);
    res.json({ message: "Concesionario borrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
