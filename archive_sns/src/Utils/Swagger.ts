import express from "express";
import swaggerUi from "swagger-ui-express";
import { getMetadataArgsStorage } from "routing-controllers";
import { getFromContainer, MetadataStorage } from "class-validator";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { routingControllerOptions } from "./RoutingConfig";
import { env } from "../env";

export function initSwagger(app: express.Application) {
	const schemas = validationMetadatasToSchemas(
		(getFromContainer(MetadataStorage) as any).validationMetadatas
	);
	
	const storage = getMetadataArgsStorage();
	const spec = routingControllersToSpec(storage, routingControllerOptions, {
		components: {
			schemas,
			refPointerPrefix: "#/components/schemas",
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		info: {
			title: "Archive SNS Server",
			description: "Archive SNS OpenAPI",
			version: "1.0.0",
		},
	});

  	app.use(env.swagger.route, swaggerUi.serve, swaggerUi.setup(spec));
}
