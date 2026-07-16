import jwt from "jsonwebtoken";
import config from "../config/index.js";

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({
			statusCode: 401,
			error: "Se requiere autenticacion: header Authorization: Bearer <token>",
		});
	}

	const token = authHeader.split(" ")[1];

	try {
		req.user = jwt.verify(token, config.jwtSecret);
		return next();
	} catch (error) {
		return res
			.status(401)
			.json({ statusCode: 401, error: "Token invalido o expirado" });
	}
};

export default authMiddleware;
