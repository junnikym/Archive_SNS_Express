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
				"src/Models/Entities/*{.ts,.js}"
			]
		};

		useContainer(Container);
		const connection = await createConnection(connectionOpts);
	} catch (error) {
		throw error;
	}
}
