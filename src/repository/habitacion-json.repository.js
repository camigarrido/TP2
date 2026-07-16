import fs from "node:fs/promises";
import path from "node:path";

const DB_PATH = path.resolve("database/database.json");

export default class HabitacionRepositoryJson {
	async readAll() {
		try {
			const raw = await fs.readFile(DB_PATH, "utf-8");
			return JSON.parse(raw || "[]");
		} catch (error) {
			if (error.code === "ENOENT") return [];
			throw error;
		}
	}

	async writeAll(habitaciones) {
		await fs.writeFile(DB_PATH, JSON.stringify(habitaciones, null, 2));
	}

	async findAll() {
		return this.readAll();
	}

	async findById(id) {
		const habitaciones = await this.readAll();
		return habitaciones.find((h) => h.id === id) || null;
	}

	async create(habitacion) {
		const habitaciones = await this.readAll();
		habitaciones.push(habitacion);
		await this.writeAll(habitaciones);
		return habitacion;
	}

	async update(id, changes) {
		const habitaciones = await this.readAll();
		const index = habitaciones.findIndex((h) => h.id === id);
		if (index === -1) return null;
		habitaciones[index] = { ...habitaciones[index], ...changes };
		await this.writeAll(habitaciones);
		return habitaciones[index];
	}

	async remove(id) {
		const habitaciones = await this.readAll();
		const index = habitaciones.findIndex((h) => h.id === id);
		if (index === -1) return false;
		habitaciones.splice(index, 1);
		await this.writeAll(habitaciones);
		return true;
	}
}
