import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

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