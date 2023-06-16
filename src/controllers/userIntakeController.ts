import { Request, Response } from "express";
import Role from "../db/models/Role";
import helper from "../functionHelpers/helper";
import UserIntake from "../db/models/UserIntake";
import User from "../db/models/User";

const createUserIntake = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, carbohydrates, sugar, proteins, fat } = req.body;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send(helper.responseData(404, "User not found.", null, null));
      }
  
      const userIntake = await UserIntake.create({
        userId,
        carbohydrates,
        sugar,
        proteins,
        fat,
      });
  
      return res.status(200).send(helper.responseData(200, "Created", null, userIntake));
    } catch (error: any) {
      console.log(error);
      return res.status(500).send(helper.responseData(500, "Internal server error", null, null));
    }
  };

const updateUserIntake = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const { carbohydrates, sugar, proteins, fat } = req.body;

		const userIntake = await UserIntake.findByPk(id);

		if (!userIntake) {
			return res.status(404).send(helper.responseData(404,"Data not found", null, null))
		}

		userIntake.carbohydrates = carbohydrates;
		userIntake.sugar = sugar;
        userIntake.proteins = proteins;
        userIntake.fat = fat;

		await userIntake.save();

		return res.status(200).send(helper.responseData(200,"OK", null, userIntake))
	} catch (error: any) {
		if (error != null && error instanceof Error) {
			return res.status(500).send(helper.responseData(500, "", error, null));
		};

		return res.status(500).send(helper.responseData(500, "", error, null));
	}
};

const getUserIntakeById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
  
      const userIntake = await UserIntake.findByPk(id);
  
      if (!userIntake) {
        return res.status(404).send(helper.responseData(404, "User not found.", null, null));
      }
  
      return res.status(200).send(helper.responseData(200, "OK", null, userIntake));
    } catch (error: any) {
      return res.status(500).send(helper.responseData(500, "Internal server error.", null, null));
    }
  };

const getUserIntakeByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params;
  
      const userIntakes = await UserIntake.findAll({
        where: {
          userId: userId
        }
      });
  
      return res.status(200).send(helper.responseData(200, "OK", null, userIntakes));
    } catch (error: any) {
      if (error != null && error instanceof Error) {
        return res.status(500).send(helper.responseData(500, "", error, null));
      }
  
      return res.status(500).send(helper.responseData(500, "", error, null));
    }
  };


export default { createUserIntake, getUserIntakeByUserId, updateUserIntake, getUserIntakeById };