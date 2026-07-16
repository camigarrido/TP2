import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import * as habitacionController from "../controllers/habitacion.controller.js";

const router = Router();

router.post("/", habitacionController.createHabitacion);
router.get("/", habitacionController.listHabitaciones);
router.get("/:id", habitacionController.getHabitacion);
router.put("/:id", authMiddleware, habitacionController.updateHabitacion);
router.delete("/:id", authMiddleware, habitacionController.deleteHabitacion);

export default router;
