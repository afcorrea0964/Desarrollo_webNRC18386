const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// CREAR: Guardar un nuevo carro
router.post("/cars", async (req, res) => {
    try {
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// LEER (Leer todos los carros)
router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/cars/:id", getCar, (req, res) => {
    res.json(res.car);
});

// ACTUALIZAR
router.put("/cars/:id", getCar, async (req, res) => {
    try {
        Object.assign(res.car, req.body);
        const updatedCar = await res.car.save();
        res.json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ELIMINAR
router.delete("/cars/:id", async (req, res) => {
    try {
        const carId = req.params.id;
        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



async function getCar(req, res, next) {
    try {
        const car = await Car.findById(req.params.id);
        if (car == null) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.car = car;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = router;
