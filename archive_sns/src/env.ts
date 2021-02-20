/**
 * Choose Enviroment 
 * 
 * < Linux / Max OS >
 * 
 * wanna use development enviroment
 *  > export NODE_ENV=development
 * 
 * production enviroment
 *  > export NODE_ENV=production
 * 
 * < Windows >
 *  > set NODE_ENV=development
 * or 
 *  > set NODE_ENV=production
 * 
 * if NODE_ENV doesn't exist, development enviroment will be setting
 */

require("dotenv").config({
	path: __dirname+`/../config/.env.${process.env.NODE_ENV || "development"}`,
});

/**
 * Enviroment Setting
 */

export const env = {
	which_env: process.env.NODE_ENV || "development",

	app: {
		port			: Number(process.env.PORT) || 8000,
		// apiPrefix		: process.env.API_PREFIX || "/api",
	},

	database: {
		host		: process.env.DATABASE_HOST,
		port		: Number(process.env.DATABASE_PORT) || 3306,
		usename		: process.env.DATABASE_USERNAME,
		password	: process.env.DATABASE_PASSWORD,
		name		: process.env.DATABASE_NAME,
		synchronize	: process.env.TYPEORM_SYNCHRONIZE === "true",
		logging		: process.env.TYPEORM_LOGGING === "true",
	},

	jwt: {
		secret_access_key : process.env.JWT_SECRET_ACCESS_KEY,
		secret_refresh_key : process.env.JWT_SECRET_REFRESH_KEY,
	},

	swagger: {
		route: process.env.SWAGGER_ROUTE,
	},
};
