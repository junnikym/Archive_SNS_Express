import Container from "typedi";
import { createConnection, ConnectionOptions, useContainer } from "typeorm";
import { env } from "./env";

/**
 * DB Connection Setting
 */
export async function db_conn(): Promise<void> {
	try {
		const connectionOpts: ConnectionOptions = {
			type: "mysql",
			host: env.database.host,
			port: env.database.port,
			username: env.database.usename,
			password: env.database.password,
			database: env.database.name,
			synchronize: env.database.synchronize,
			logging: env.database.logging,
			entities: [
				"./Models/Entities/*{.ts,.js}"
			],
		};

		useContainer(Container);
		await createConnection(connectionOpts);
	} catch (error) {
		console.log("host : ", env.database.host);
		console.log("port : ", env.database.port);
		console.log("usename : ", env.database.usename);
		console.log("password : ", env.database.password);
		console.log("name : ", env.database.name);

		throw error;
	}
}
