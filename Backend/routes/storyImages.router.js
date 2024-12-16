const router = require("express").Router();
const storyImagesController = require('../controller/storyImages.controller');
router.post("/storyImage",storyImagesController.addImage);
router.delete("/storyImage",storyImagesController.deleteImage);
router.get("/storyImage/:email",storyImagesController.getImageByEmail);
router.get("/storyImageCategory/:category",storyImagesController.getImagesByCategory);




module.exports = router;