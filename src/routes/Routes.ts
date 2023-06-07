import express from "express";
import roleController from "../controllers/roleController";
import userController from "../controllers/userController";
import userValidation from "../middleware/validation/userValidation";
import masterMenuController from "../controllers/masterMenuController";
import subMenuController from "../controllers/subMenuController";
import authorization from "../middleware/authorization";
import menuValidation from "../middleware/validation/menuValidation";
import roleMenuAccessController from "../controllers/roleMenuAccessController";



const router = express.Router();

//Role route
router.get("/role", authorization.authenticated, roleController.getRole);
router.get("/role/:id", roleController.getRoleById);
router.post("/role",authorization.authenticated, authorization.basicAdmin, roleController.createRole);
router.post("/role/:id",authorization.authenticated, authorization.basicAdmin, roleController.updateRole);
router.delete("/role/:id", authorization.authenticated, authorization.superUser , roleController.deleteRole);

//User route
router.post("/user/signup", userValidation.registerValidation, userController.Register);
router.post("/user/login", userController.userLogin);
router.get("/user/refresh-token", userController.refreshToken);
router.get("/user/current-user", authorization.authenticated, userController.userDetail);
router.get("/user/logout", authorization.authenticated, userController.userLogout);

// Master Menu Routing
router.post("/menu", menuValidation.createMenuValidation, authorization.authenticated, authorization.basicAdmin, masterMenuController.createMenu);
router.get("/menu", authorization.authenticated, authorization.basicAdmin, masterMenuController.getListMenu);
router.get("/menu/get/all", authorization.authenticated, authorization.superUser, masterMenuController.getAllMenu);
router.get("/menu/:id", authorization.authenticated, authorization.basicAdmin, masterMenuController.getDetailMenu);
router.patch("/menu/:id", menuValidation.createMenuValidation, authorization.authenticated, authorization.basicAdmin, masterMenuController.updateMenu);
router.delete("/menu/:id", authorization.authenticated, authorization.basicAdmin, masterMenuController.softDeleteMenu);
router.delete("/menu/permanent/:id", authorization.authenticated, authorization.superUser, masterMenuController.permanentDelete);

// Sub Menu Routing
router.post("/sub-menu", menuValidation.createSubmenuValidation, authorization.authenticated, authorization.basicAdmin, subMenuController.createSubmenu);
router.get("/sub-menu", authorization.authenticated, authorization.basicAdmin, subMenuController.getListSubmenu);
router.get("/sub-menu/get/all", authorization.authenticated, authorization.superUser, subMenuController.getAllSubmenu);
router.get("/sub-menu/:id", authorization.authenticated, authorization.basicAdmin, subMenuController.getDetailSubmenu);
router.patch("/sub-menu/:id", menuValidation.createSubmenuValidation, authorization.authenticated, authorization.basicAdmin, subMenuController.updateSubmenu);
router.delete("/sub-menu/:id", authorization.authenticated, authorization.basicAdmin, subMenuController.softDelete);
router.delete("/sub-menu/permanent/:id", authorization.authenticated, authorization.superUser, subMenuController.permanentDelete);

// Role Menu Access
router.post("/role-menu-access", menuValidation.createRoleMenuAccess , authorization.authenticated, authorization.superUser, roleMenuAccessController.createAccess);
router.get("/role-menu-access", authorization.authenticated, authorization.superUser, roleMenuAccessController.getList);
router.get("/role-menu-access/get/all", authorization.authenticated, authorization.superUser, roleMenuAccessController.getAll);
router.get("/role-menu-access/:id", authorization.authenticated, authorization.superUser, roleMenuAccessController.getDetail);
router.patch("/role-menu-access/:id", menuValidation.createRoleMenuAccess, authorization.authenticated, authorization.superUser, roleMenuAccessController.updateAccess);
router.delete("/role-menu-access/:id", authorization.authenticated, authorization.superUser, roleMenuAccessController.softDelete);

export default router;