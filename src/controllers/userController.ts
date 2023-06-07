import { Request, Response } from "express";
import { Op } from "sequelize";
import helper from "../functionHelpers/helper";
import passwordHelper from "../functionHelpers/passwordHelper";
import User from "../db/models/User";
import Role from "../db/models/Role";
import RoleMenuAccess from "../db/models/RoleMenuAccess";
import MasterMenu from "../db/models/MasterMenu";
import subMenu from "../db/models/SubMenu";

const Register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, roleId, confirmPassword } = req.body;
        const hash = await passwordHelper.passwordHashing(password);
        const user = await User.create({
            name,
            email,
            password: hash,
            active: true,
            verified: true,
            roleId: roleId
        });
        return res.status(201).send(helper.responseData(201, "Created.", null, user));
        
    } catch (error:any) {
        return res.status(500).send(helper.responseData(500, "", error, null)); 
    }
};

const userLogin = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: {
				email: email
			}
		});

		if (!user) {
			return res.status(401).send(helper.responseData(401, "Unauthorized", null, null));
		}

		const matched = await passwordHelper.passwordCompare(password, user.password);
		if (!matched) {
			return res.status(401).send(helper.responseData(401, "Unauthorized", null, null));
		}

		const dataUser = {
			id: user.id,
			name: user.name,
			email: user.email,
			roleId: user.roleId,
			verified: user.verified,
			active: user.active
		};
		const token = helper.generateToken(dataUser);
		const refreshToken = helper.generateRefreshToken(dataUser);

		user.accessToken = refreshToken;
		await user.save();
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});

		const roleAccess = await RoleMenuAccess.findAll({
			where: {
				roleId: user.roleId,
				active: true
			}
		});

		const listSubmenuId = roleAccess.map((item) => {
			return item.submenuId
		});

		const menuAccess = await MasterMenu.findAll({
			where: {
				active: true
			},
			order: [
				['ordering', 'ASC'],
				[subMenu, 'ordering', 'ASC']
			],
			include: {
				model: subMenu,
				where: {
					id: { [Op.in]: listSubmenuId }
				}
			}
		});


		const responseUser = {
			id: user.id,
			name: user.name,
			email: user.email,
			roleId: user.roleId,
			verified: user.verified,
			active: user.active,
			token: token,
			menuAccess: menuAccess
		}
		return res.status(200).send(helper.responseData(200, "OK", null, responseUser));
	} catch (error) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
};

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
	try {
		const RefreshToken = req.cookies?.refreshToken;

		if (!RefreshToken) {
			return res.status(401).send(helper.responseData(401, "Unauthorized", null, null));
		}

		const decodedUser = helper.extractRefreshToken(RefreshToken);
		console.log(decodedUser);
		if (!decodedUser) {
			return res.status(401).send(helper.responseData(401, "Unauthorized", null, null));
		}

		const token = helper.generateToken({
			name: decodedUser.name,
			email: decodedUser.email,
			roleId: decodedUser.roleId,
			verified: decodedUser.verified,
			active: decodedUser.active
		});

		const resultUser = {
			name: decodedUser.name,
			email: decodedUser.email,
			roleId: decodedUser.roleId,
			verified: decodedUser.verified,
			active: decodedUser.active,
			token: token
		}

		return res.status(200).send(helper.responseData(200, "OK", null, resultUser));

	} catch (error) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
};

const userDetail = async (req: Request, res: Response): Promise<Response> => {
	try {
		const email = res.locals.userEmail;
		const user = await User.findOne({
			where: {
				email: email
            },
			include: {
				model: Role,
				attributes: ["id", "roleName"]
			}
		});

		if (!user) {
			return res.status(404).send(helper.responseData(404, "User not found", null, null));
		}

		user.password = "";
		user.accessToken = "";
		return res.status(200).send(helper.responseData(200, "OK", null, user));
	} catch (error) {
        console.log(error);
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
};

const userLogout = async (req: Request, res: Response): Promise<Response> => {
	try {
		const refreshToken = req.cookies?.refreshToken;
		if (!refreshToken) {
			return res.status(200).send(helper.responseData(200, "User logged out", null, null));
		}
		const email = res.locals.userEmail;
		const user = await User.findOne({
			where: {
				email: email
			}
		});

		if (!user) {
			res.clearCookie("refreshToken");
			return res.status(200).send(helper.responseData(200, "User logged out", null, null));
		}

		await user.update({ accessToken: null }, { where: { email: email } });
		res.clearCookie("refreshToken");
		return res.status(200).send(helper.responseData(200, "User logged out", null, null));
	} catch (error) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
}


export default { Register, userLogin, refreshToken, userDetail, userLogout };