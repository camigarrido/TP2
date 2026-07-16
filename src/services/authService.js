import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const login = async ({ username, password }) => {
	if (!username || !password) {
		throw new Error("Los campos 'username' y 'password' son requeridos");
	}

	if (username !== config.authUser || password !== config.authPassword) {
		throw new Error("Credenciales invalidas");
	}

	const token = jwt.sign({ username }, config.jwtSecret, {
		expiresIn: config.jwtExpiresIn,
	});

	return { token };
};
