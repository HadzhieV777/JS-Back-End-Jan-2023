const router = require("express").Router();
const cubeController = require("../controllers/cubeController");
const homeController = require("../controllers/homeController");
const accessoryController = require("../controllers/accessoryController");
const authController = require("../controllers/authController");

// Auth routes
router.use('/auth', authController)

// Home routes
router.get("/", homeController.getHomePage);
router.get("/about", homeController.getAboutPage);

// Cube routes
router.get("/cubes/create", cubeController.getCreateCube);
router.post("/cubes/create", cubeController.postCreateCube);
router.get("/cubes/:cubeId/details", cubeController.getDetails);
router.get("/cubes/:cubeId/attach", cubeController.getAttachAccessory);
router.post("/cubes/:cubeId/attach", cubeController.postAttachAccessory);
router.get("/cubes/:cubeId/edit", cubeController.getEditCube);
router.get("/cubes/:cubeId/delete", cubeController.getDeleteCube);

// Accessory routes
router.use('/accessories', accessoryController)

module.exports = router;
