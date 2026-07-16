import "dotenv/config";

export default {
	port: process.env.PORT || 3000,
	dbProvider: (process.env.DB_PROVIDER || "json").toLowerCase(),
	mongoUri: process.env.MONGODB_URI,
	mongoDbName: process.env.MONGODB_DB || "hotel_api",
	authUser: process.env.AUTH_USER || "admin",
	authPassword: process.env.AUTH_PASSWORD || "admin123",
	jwtSecret: process.env.JWT_SECRET || "supersecret",
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
