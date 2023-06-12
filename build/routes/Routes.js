"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = __importDefault(require("../controllers/roleController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userValidation_1 = __importDefault(require("../middleware/validation/userValidation"));
const masterMenuController_1 = __importDefault(require("../controllers/masterMenuController"));
const subMenuController_1 = __importDefault(require("../controllers/subMenuController"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
const menuValidation_1 = __importDefault(require("../middleware/validation/menuValidation"));
const roleMenuAccessController_1 = __importDefault(require("../controllers/roleMenuAccessController"));
const userAdditionalInfo_1 = __importDefault(require("../controllers/userAdditionalInfo"));
const userIntakeController_1 = __importDefault(require("../controllers/userIntakeController"));
const router = express_1.default.Router();
//Role route
router.get("/role", authorization_1.default.authenticated, roleController_1.default.getRole);
router.get("/role/:id", roleController_1.default.getRoleById);
router.post("/role", authorization_1.default.authenticated, authorization_1.default.basicAdmin, roleController_1.default.createRole);
router.post("/role/:id", authorization_1.default.authenticated, authorization_1.default.basicAdmin, roleController_1.default.updateRole);
router.delete("/role/:id", authorization_1.default.authenticated, authorization_1.default.superUser, roleController_1.default.deleteRole);
//User route
router.post("/user/signup", userValidation_1.default.registerValidation, userController_1.default.Register);
router.post("/user/login", userController_1.default.userLogin);
router.get("/user/refresh-token", userController_1.default.refreshToken);
router.get("/user/current-user", authorization_1.default.authenticated, userController_1.default.userDetail);
router.post("/user/:id", authorization_1.default.authenticated, userController_1.default.userUpdate);
router.get("/user/logout", authorization_1.default.authenticated, userController_1.default.userLogout);
router.post("/user/:id/additional-info", userAdditionalInfo_1.default);
//User Intakes
router.post("/user-intake", userIntakeController_1.default.createUserIntake);
router.put("/user-intake/:id", userIntakeController_1.default.updateUserIntake);
router.get("/user-intake/:id", userIntakeController_1.default.getUserIntakeById);
router.get("/user-intake/user/:userId", userIntakeController_1.default.getUserIntakeByUserId);
// Master Menu Routing
router.post("/menu", menuValidation_1.default.createMenuValidation, authorization_1.default.authenticated, authorization_1.default.basicAdmin, masterMenuController_1.default.createMenu);
router.get("/menu", authorization_1.default.authenticated, authorization_1.default.basicAdmin, masterMenuController_1.default.getListMenu);
router.get("/menu/get/all", authorization_1.default.authenticated, authorization_1.default.superUser, masterMenuController_1.default.getAllMenu);
router.get("/menu/:id", authorization_1.default.authenticated, authorization_1.default.basicAdmin, masterMenuController_1.default.getDetailMenu);
router.patch("/menu/:id", menuValidation_1.default.createMenuValidation, authorization_1.default.authenticated, authorization_1.default.basicAdmin, masterMenuController_1.default.updateMenu);
router.delete("/menu/:id", authorization_1.default.authenticated, authorization_1.default.basicAdmin, masterMenuController_1.default.softDeleteMenu);
router.delete("/menu/permanent/:id", authorization_1.default.authenticated, authorization_1.default.superUser, masterMenuController_1.default.permanentDelete);
// Sub Menu Routing
router.post("/sub-menu", menuValidation_1.default.createSubmenuValidation, authorization_1.default.authenticated, authorization_1.default.basicAdmin, subMenuController_1.default.createSubmenu);
router.get("/sub-menu", authorization_1.default.authenticated, authorization_1.default.basicAdmin, subMenuController_1.default.getListSubmenu);
router.get("/sub-menu/get/all", authorization_1.default.authenticated, authorization_1.default.superUser, subMenuController_1.default.getAllSubmenu);
router.get("/sub-menu/:id", authorization_1.default.authenticated, authorization_1.default.basicAdmin, subMenuController_1.default.getDetailSubmenu);
router.patch("/sub-menu/:id", menuValidation_1.default.createSubmenuValidation, authorization_1.default.authenticated, authorization_1.default.basicAdmin, subMenuController_1.default.updateSubmenu);
router.delete("/sub-menu/:id", authorization_1.default.authenticated, authorization_1.default.basicAdmin, subMenuController_1.default.softDelete);
router.delete("/sub-menu/permanent/:id", authorization_1.default.authenticated, authorization_1.default.superUser, subMenuController_1.default.permanentDelete);
// Role Menu Access
router.post("/role-menu-access", menuValidation_1.default.createRoleMenuAccess, authorization_1.default.authenticated, authorization_1.default.superUser, roleMenuAccessController_1.default.createAccess);
router.get("/role-menu-access", authorization_1.default.authenticated, authorization_1.default.superUser, roleMenuAccessController_1.default.getList);
router.get("/role-menu-access/get/all", authorization_1.default.authenticated, authorization_1.default.superUser, roleMenuAccessController_1.default.getAll);
router.get("/role-menu-access/:id", authorization_1.default.authenticated, authorization_1.default.superUser, roleMenuAccessController_1.default.getDetail);
router.patch("/role-menu-access/:id", menuValidation_1.default.createRoleMenuAccess, authorization_1.default.authenticated, authorization_1.default.superUser, roleMenuAccessController_1.default.updateAccess);
router.delete("/role-menu-access/:id", authorization_1.default.authenticated, authorization_1.default.superUser, roleMenuAccessController_1.default.softDelete);
exports.default = router;
