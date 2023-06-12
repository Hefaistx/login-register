import { Request, Response } from "express";
import helper from "../functionHelpers/helper";
import User from "../db/models/User";

const updateUserAdditionalInfo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { age, weight, height } = req.body;
      
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).send(helper.responseData(404, "User not found", null, null));
      }
      
      if (age) {
        user.age = age;
      }
      
      if (weight) {
        user.weight = weight;
      }
      
      if (height) {
        user.height = height;
      }
      
      await user.save();
      
      return res.status(200).send(helper.responseData(200, "OK", null, user));
    } catch (error) {
      return res.status(500).send(helper.responseData(500, "", error, null));
    }
  };

  export default updateUserAdditionalInfo;