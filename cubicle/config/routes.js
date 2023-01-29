const router = require("express").Router();
const cubeController = require("../controllers/cubeController");
const homeController = require("../controllers/homeController");
const accessoryController = require("../controllers/accessoryController");

// Home routes
router.get("/", homeController.getHomePage);
router.get("/about", homeController.getAboutPage);

// Cube routes
router.get("/create", cubeController.getCreateCube);
router.get("/create", cubeController.getCreateCube);
router.post("/create", cubeController.postCreateCube);
router.get("/cubes/:cubeId/details", cubeController.getDetails);
router.get("/cubes/:cubeId/attach", cubeController.getAttachAccessory);
router.post("/cubes/:cubeId/attach", cubeController.postAttachAccessory);

// Accessory routes
router.use('/accessories', accessoryController)

module.exports = router;
