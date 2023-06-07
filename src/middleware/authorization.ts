import { Request, Response, NextFunction } from "express";
import helper from "../functionHelpers/helper";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authToken = req.headers["authorization"];
		const token = authToken && authToken.split(" ")[1];

		if (token === null) {
			return res.status(401).send(helper.responseData(401, "Unauthorized", null, null));
		}
		const result = helper.extractToken(token!);
		if (!result) {
			return res.status(401).send(helper.responseData(401, "Unauthorized", null, null));
		}

		res.locals.userEmail = result?.email;
		res.locals.roleId = result?.roleId;
		next();

	} catch (err:any) {
		return res.status(500).send(helper.responseData(500, "", err, null));
	}
}

const superUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		const roleId = res.locals.roleId;
		if (roleId !== 6) {
			return res.status(401).send(helper.responseData(403, "Access Forbidden", null, null));
		}

		next();
	} catch (err:any) {
		return res.status(500).send(helper.responseData(500, "", err, null));
	}
};

const basicAdmin = (req: Request, res: Response, next: NextFunction) => {
	try {
		const roleId = res.locals.roleId;
		if (roleId !== 2) {
			return res.status(401).send(helper.responseData(403, "Access Forbidden", null, null));
		}

		next();
	} catch (err:any) {
		console.log(Error);
		return res.status(500).send(helper.responseData(500, "", err, null));
	}
};

const basicUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		const roleId = res.locals.roleId;
		if (roleId !== 3) {
			return res.status(401).send(helper.responseData(403, "Access Forbidden", null, null));
		}

		next();
	} catch (err:any) {
		return res.status(500).send(helper.responseData(500, "", err, null));
	}
};

export default { authenticated, superUser, basicAdmin, basicUser }