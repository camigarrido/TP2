import * as habitacionService from "../services/habitacionService.js";

export const listHabitaciones = async (req, res) => {
	try {
		const habitaciones = await habitacionService.listHabitaciones({
			disponible: req.query.disponible,
		});
		res.status(200).json(habitaciones);
	} catch (error) {
		res
			.status(500)
			.json({ statusCode: 500, error: "Error interno del servidor" });
	}
};

export const getHabitacion = async (req, res) => {
	try {
		const habitacion = await habitacionService.getHabitacion(req.params.id);
		res.status(200).json(habitacion);
	} catch (error) {
		res.status(404).json({ statusCode: 404, error: error.message });
	}
};

export const createHabitacion = async (req, res) => {
	try {
		const habitacion = await habitacionService.createHabitacionService(
			req.body,
		);
		res.status(201).json(habitacion);
	} catch (error) {
		res.status(400).json({ statusCode: 400, error: error.message });
	}
};

export const updateHabitacion = async (req, res) => {
	try {
		const habitacion = await habitacionService.updateHabitacionService(
			req.params.id,
			req.body,
		);
		res.status(200).json(habitacion);
	} catch (error) {
		if (error.message.includes("no encontrada")) {
			return res.status(404).json({ statusCode: 404, error: error.message });
		}
		res.status(400).json({ statusCode: 400, error: error.message });
	}
};

export const deleteHabitacion = async (req, res) => {
	try {
		await habitacionService.deleteHabitacionService(req.params.id);
		res.status(200).json({ message: "Habitacion eliminada correctamente" });
	} catch (error) {
		res.status(404).json({ statusCode: 404, error: error.message });
	}
};
