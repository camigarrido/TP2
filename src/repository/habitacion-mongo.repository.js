import { MongoClient } from "mongodb";
import config from "../config/index.js";

const stripMongoId = (doc) => {
	if (!doc) return doc;
	const { _id, ...rest } = doc;
	return rest;
};

export default class HabitacionRepositoryMongo {
	#db = null;
	#connectPromise = null;

	async connect() {
		if (this.#db) return this.#db;

		if (!this.#connectPromise) {
			this.#connectPromise = (async () => {
				const client = new MongoClient(config.mongoUri);
				await client.connect();
				this.#db = client.db(config.mongoDbName);
				console.log(`MongoDB connected: ${config.mongoDbName}`);
				return this.#db;
			})().catch((error) => {
				this.#connectPromise = null;
				throw error;
			});
		}

		return this.#connectPromise;
	}

	async getCollection() {
		const db = await this.connect();
		return db.collection("habitaciones");
	}

	async findAll() {
		const collection = await this.getCollection();
		const docs = await collection.find({}).toArray();
		return docs.map(stripMongoId);
	}

	async findById(id) {
		const collection = await this.getCollection();
		const doc = await collection.findOne({ id });
		return stripMongoId(doc);
	}

	async create(habitacion) {
		const collection = await this.getCollection();
		await collection.insertOne({ ...habitacion });
		return habitacion;
	}

	async update(id, changes) {
		const collection = await this.getCollection();
		const result = await collection.findOneAndUpdate(
			{ id },
			{ $set: changes },
			{ returnDocument: "after" },
		);
		return stripMongoId(result?.value ?? result);
	}

	async remove(id) {
		const collection = await this.getCollection();
		const result = await collection.deleteOne({ id });
		return result.deletedCount > 0;
	}
}
