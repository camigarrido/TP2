import * as authService from "../services/authService.js";

export const login = async (req, res) => {
	try {
		const result = await authService.login(req.body);
		res.status(200).json(result);
	} catch (error) {
		if (error.message === "Credenciales invalidas") {
			return res.status(401).json({ statusCode: 401, error: error.message });
		}
		res.status(400).json({ statusCode: 400, error: error.message });
	}
};
