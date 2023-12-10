const express = require("express");
const router = express.Router();
const Coche = require("../modelos/modeloConcesionario");

// Obtener coches de un concesionario por su ID
router.get("/:id/coches", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const coches = await Coche.find({ concesionario: idConcesionario });
    res.json(coches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Añadir un nuevo coche al concesionario por su ID
router.post("/:id/coches", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    req.body.concesionario = idConcesionario;
    const nuevoCoche = new Coche(req.body);
    await nuevoCoche.save();
    res.status(201).json({ message: "Coche añadido correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un coche por su índice para el concesionario especificado por ConcesionarioID.
router.get("/:id/coches/:cocheId", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const cocheId = req.params.cocheId;
    const coche = await Coche.findOne({ _id: cocheId, concesionario: idConcesionario });
    if (!coche) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json(coche);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un coche por su índice para el concesionario especificado por ConcesionarioID
router.put("/:id/coches/:cocheId", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const cocheId = req.params.cocheId;
    const resultado = await Coche.findByIdAndUpdate({ _id: cocheId, concesionario: idConcesionario }, req.body, {
      new: true,
    });
    if (!resultado) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json({ message: "Coche actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Borrar un coche por su índice para el concesionario especificado por ConcesionarioID
router.delete("/:id/coches/:cocheId", async (req, res) => {
  try {
    const idConcesionario = req.params.id;
    const cocheId = req.params.cocheId;
    const resultado = await Coche.deleteOne({ _id: cocheId, concesionario: idConcesionario });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json({ message: "Coche borrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
