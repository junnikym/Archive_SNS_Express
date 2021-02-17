import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { Account } from "../Models/Entities/Account";

export const VerifyAccessToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		res.locals.jwt_payload = "test";
			// jwt.verify(req.headers.authorization, env.jwt.secret_access_key);
	} 
	catch(error) {
		
		// < Over Expiration Time >
		if (error.name === 'TokenExpiredError') {
			return res.status(419).send({
				status: 419,
				success: false,
				message: "Token expired"
			});
		}

		// < Token is not matched >
		return res.status(401).send({
			status: 401,
			success: false,
			message: "Token is not valid"
		});

	}

	next();
};

export const VerifyRefreshToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {

	try {
		res.locals.token = req.body.refresh_token;
		res.locals.jwt_payload = 
			jwt.verify( req.body.refresh_token, env.jwt.secret_refresh_key );
	} 
	catch (error) {
		return res.status(401).send({
			status: 401,
			success: false,
			message: "Missing Token"
		});
	}

	next();
};

export const AccessTokenGenerator = (account: Account) => {
	return jwt.sign(
		{ 
			pk: account.pk,
			email: account.email, 
			name: account.name, 
		},
		env.jwt.secret_access_key,
		{
			expiresIn: "30m",
		},
	);
}

export const RefreshTokenGenerator = (account: Account) => {
	return jwt.sign(
		{
			pk: account.pk,
		}, 
		env.jwt.secret_refresh_key,
		{ 
			expiresIn: "14d",
		}
	);
}