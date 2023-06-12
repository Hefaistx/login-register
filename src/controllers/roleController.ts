import { Request, Response } from "express";
import Role from "../db/models/Role";
import helper from "../functionHelpers/helper";

const getRole = async (req: Request, res: Response): Promise<Response> => {
	try {
		const authToken = req.headers["authorization"];
		const token = authToken && authToken.split(" ")[1];
		
		const roles = await Role.findAll({
			where: {
				active: true
			}
		});

		return res.status(200).send(helper.responseData(200, "OK",null, roles))
	} catch (error: any) {
		if (error != null && error instanceof Error) {
			return res.status(500).send(helper.responseData(500, "", error, null))
		}

		return res.status(500).send(helper.responseData(500, "", error, null))
	}
};

const createRole = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { roleName, active } = req.body;

		const create = await Role.create({
			roleName,
			active
		});

		return res.status(201).send({
			status: 201,
			message: "Created",
			data: create
		});
	} catch (error:any) {
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		return res.status(500).send(helper.responseData(500,"Data not found", error, null))
	}
}

const updateRole = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const { roleName, active } = req.body;

		const role = await Role.findByPk(id);

		if (!role) {
			return res.status(404).send(helper.responseData(404,"Data not found", null, null))
		}

		role.roleName = roleName;
		role.active = active;

		await role.save();

		return res.status(200).send(helper.responseData(200,"OK", null, role))
	} catch (error: any) {
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
	}
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const role = await Role.findByPk(id);

        if (!role) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}
        await role.destroy();

        return res.status(200).send({
			status: 200,
			message: "Deleted",
			data: null
		});
    } catch (error:any) {
        if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
    }
}

const getRoleById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const role = await Role.findByPk(id);

        if (!role) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

        return res.status(200).send({
			status: 200,
			message: "OK",
			data: role
		});
    } catch (error:any) {
        if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
    }
}


export default { getRole, getRoleById, createRole, updateRole, deleteRole };