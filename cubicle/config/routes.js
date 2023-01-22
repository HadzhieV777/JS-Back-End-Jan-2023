const router = require("express").Router();
const cubeController = require("../controllers/cubeController");
const homeController = require("../controllers/homeController");

// Home routes
router.get("/", homeController.getHomePage);
router.get("/about", homeController.getAboutPage);

// Cube routes
router.get("/create", cubeController.getCreateCube);
router.get("/create", cubeController.getCreateCube);
router.post("/create", cubeController.postCreateCube);

module.exports = router;
