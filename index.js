import app from "./app.js";
import config from "./src/config/index.js";

app.listen(config.port, () => {
	console.log(
		`Hotel API corriendo en el puerto ${config.port} (DB_PROVIDER=${config.dbProvider})`,
	);
});
