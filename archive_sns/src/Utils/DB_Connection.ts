import Container from "typedi";
import { createConnection, ConnectionOptions, useContainer, Connection } from "typeorm";
import { env } from "../env";

/**
 * DB Connection Setting
 */
export async function db_conn(): Promise<Connection> {
	try {
		const connectionOpts: ConnectionOptions = {
			type: "mysql",
			host: env.database.host,
			port: env.database.port,
			username: env.database.usename,
			password: env.database.password,
			database: env.database.name,
			logging: env.database.logging,
			entities: [
				__dirname + "/../Models/Entities/**/*{.ts,.js}"
			]
		};

		useContainer(Container);
		const connection = await createConnection(connectionOpts);
		if(env.database.synchronize) {
			await connection.dropDatabase();
			await connection.synchronize();
		}

		return connection;
	} catch (error) {
		throw error;
	}
}
