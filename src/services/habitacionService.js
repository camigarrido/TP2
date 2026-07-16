import { randomUUID } from "node:crypto";
import createHabitacion from "../models/habitacion.model.js";
import repository from "../repository/index.js";

const todayISODate = () => new Date().toISOString().slice(0, 10);

const isNonEmptyString = (value) =>
	typeof value === "string" && value.trim().length > 0;
const isValidPlazas = (value) => Number.isInteger(value) && value >= 0;
const isValidISODate = (value) =>
	typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);

export const listHabitaciones = async ({ disponible } = {}) => {
	const habitaciones = await repository.findAll();
	if (disponible === "true") {
		return habitaciones.filter((h) => h.plazasDisponibles > 0);
	}
	return habitaciones;
};

export const getHabitacion = async (id) => {
	const habitacion = await repository.findById(id);
	if (!habitacion) throw new Error(`Habitacion con id ${id} no encontrada`);
	return habitacion;
};

export const createHabitacionService = async ({
	nombre,
	plazasDisponibles,
	fechaAlta,
}) => {
	if (!isNonEmptyString(nombre)) {
		throw new Error("El campo 'nombre' es requerido y no puede estar vacio");
	}
	if (plazasDisponibles === undefined || plazasDisponibles === null) {
		throw new Error("El campo 'plazasDisponibles' es requerido");
	}
	if (!isValidPlazas(plazasDisponibles)) {
		throw new Error(
			"El campo 'plazasDisponibles' debe ser un entero mayor o igual a 0",
		);
	}
	if (fechaAlta !== undefined && !isValidISODate(fechaAlta)) {
		throw new Error(
			"El campo 'fechaAlta' debe tener formato ISO 8601 (YYYY-MM-DD)",
		);
	}

	const nuevaHabitacion = createHabitacion({
		id: randomUUID(),
		nombre: nombre.trim(),
		plazasDisponibles,
		fechaAlta: fechaAlta || todayISODate(),
	});

	return repository.create(nuevaHabitacion);
};

export const updateHabitacionService = async (
	id,
	{ nombre, plazasDisponibles, fechaAlta },
) => {
	const existing = await repository.findById(id);
	if (!existing) throw new Error(`Habitacion con id ${id} no encontrada`);

	const updates = {};

	if (nombre !== undefined) {
		if (!isNonEmptyString(nombre)) {
			throw new Error("El campo 'nombre' no puede estar vacio");
		}
		updates.nombre = nombre.trim();
	}

	if (plazasDisponibles !== undefined) {
		if (!isValidPlazas(plazasDisponibles)) {
			throw new Error(
				"El campo 'plazasDisponibles' debe ser un entero mayor o igual a 0",
			);
		}
		const permitido =
			existing.plazasDisponibles === plazasDisponibles ||
			plazasDisponibles === existing.plazasDisponibles + 1;
		if (!permitido) {
			throw new Error(
				`El campo 'plazasDisponibles' solo puede permanecer en ${existing.plazasDisponibles} ` +
					`o incrementarse en 1 (valor recibido: ${plazasDisponibles})`,
			);
		}
		updates.plazasDisponibles = plazasDisponibles;
	}

	if (fechaAlta !== undefined) {
		if (!isValidISODate(fechaAlta)) {
			throw new Error(
				"El campo 'fechaAlta' debe tener formato ISO 8601 (YYYY-MM-DD)",
			);
		}
		updates.fechaAlta = fechaAlta;
	}

	if (Object.keys(updates).length === 0) {
		throw new Error("Debe enviar al menos un campo para actualizar");
	}

	return repository.update(id, updates);
};

export const deleteHabitacionService = async (id) => {
	const existing = await repository.findById(id);
	if (!existing) throw new Error(`Habitacion con id ${id} no encontrada`);
	await repository.remove(id);
};
