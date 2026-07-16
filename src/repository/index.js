import HabitacionRepositoryJson from "./habitacion-json.repository.js";
import HabitacionRepositoryMongo from "./habitacion-mongo.repository.js";
import config from "../config/index.js";

class HabitacionRepositoryFactory {
	static create() {
		if (config.dbProvider === "mongo") {
			return new HabitacionRepositoryMongo();
		}

		return new HabitacionRepositoryJson();
	}
}

export default HabitacionRepositoryFactory.create();
