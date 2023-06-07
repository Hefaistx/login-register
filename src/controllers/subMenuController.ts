import { Request, Response } from "express";
import subMenu from "../db/models/SubMenu";
import helper from "../functionHelpers/helper";

const createSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;

		const submenu = await subMenu.create({
			name, masterMenuId, url, title, icon, ordering, isTargetSelf,
			active: true
		});

		return res.status(201).send(helper.responseData(201, "Created", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
};

const getListSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const submenu = await subMenu.findAll({
			where: {
				active: true
			}
		});

		return res.status(200).send(helper.responseData(200, "OK", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
}
const getAllSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const submenu = await subMenu.findAll();

		return res.status(200).send(helper.responseData(200, "OK", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
}
const getDetailSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const submenu = await subMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.responseData(404, "NotFound", null, null));
		}

		return res.status(200).send(helper.responseData(200, "OK", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
}
const updateSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
		const submenu = await subMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.responseData(404, "NotFound", null, null));
		}

		submenu.name = name;
		submenu.masterMenuId = masterMenuId;
		submenu.url = url;
		submenu.title = title;
		submenu.icon = icon;
		submenu.ordering = ordering;
		submenu.isTargetSelf = isTargetSelf;
		await submenu.save();
		
		return res.status(200).send(helper.responseData(200, "Updated", null, null));
	} catch (error:any) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
}
const softDelete = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const submenu = await subMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.responseData(404, "NotFound", null, null));
		}

		submenu.active = false;
		await submenu.save();

		return res.status(200).send(helper.responseData(200, "Removed", null, null));
	} catch (error:any) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
}

const permanentDelete = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const submenu = await subMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.responseData(404, "NotFound", null, null));
		}

		await submenu.destroy();
		return res.status(200).send(helper.responseData(200, "Deleted", null, null));
	} catch (error:any) {
		return res.status(500).send(helper.responseData(500, "", error, null));
	}
};

export default {
	createSubmenu,
	getListSubmenu,
	getAllSubmenu,
	getDetailSubmenu,
	updateSubmenu,
	softDelete,
	permanentDelete
}