import express from "express";
import morgan from "morgan";
import authRoutes from "./src/routes/auth.routes.js";
import habitacionRoutes from "./src/routes/habitacion.routes.js";
import pokemonRoutes from "./src/routes/pokemon.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/habitaciones", habitacionRoutes);
app.use("/api/v1/pokemon", pokemonRoutes);

app.use((req, res) => {
	res.status(404).json({
		statusCode: 404,
		error: `Ruta ${req.method} ${req.originalUrl} no encontrada`,
	});
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res
		.status(500)
		.json({ statusCode: 500, error: "Error interno del servidor" });
});

export default app;
