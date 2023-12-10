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

// Obtener todos los coches de un concesionario por su ID
router.get("/:id/coches", async (req, res) => {
  try {
    const concesionario = await Concesionario.findById(req.params.id);
    res.json(concesionario.coches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Añadir un nuevo coche al concesionario por su ID
router.post("/:id/coches", async (req, res) => {
  try {
    const concesionario = await Concesionario.findById(req.params.id);
    concesionario.coches.push(req.body);
    await concesionario.save();
    res.status(201).json({ message: "Coche añadido correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un coche por su id para el concesionario especificado por ConcesionarioID.
router.get("/:id/coches/:idCoche", async (req, res) => {
  try {
    const concesionario = await Concesionario.findById(req.params.id);
    const cocheEncontrado = concesionario.coches.id(req.params.idCoche);

    if (!cocheEncontrado) {
      return res.status(404).json({ message: "Coche no encontrado." });
    }
    res.json(cocheEncontrado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un coche por su id para el concesionario especificado por ConcesionarioID
router.put("/:id/coches/:idCoche", async (req, res) => {
  try {
    const concesionario = await Concesionario.findById(req.params.id);
    const coche = concesionario.coches.id(req.params.idCoche);

    if (!coche) {
      return res.status(404).json({ message: "Coche no encontrado." });
    }

    coche.set(req.body);
    await concesionario.save();

    res.json({ message: "Coche actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Borrar un coche por su id para el concesionario especificado por ConcesionarioID
router.delete("/:id/coches/:idCoche", async (req, res) => {
  try {
    const concesionario = await Concesionario.findById(req.params.id);

    if (!concesionario) {
      return res.status(404).json({ message: "Concesionario no encontrado." });
    }

    const cocheId = req.params.idCoche;

    // Utilizar el método pull para eliminar el subdocumento de la matriz
    concesionario.coches.pull({ _id: cocheId });

    await concesionario.save();

    res.json({ message: "Coche eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
