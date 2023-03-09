const express = require("express");
const multer = require("multer");
const { isAuthenticated } = require("../middlewares/isAuthenticated")

const router = express.Router();
const PostController = require("../controllers/PostController");

// multer middleware
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage }).single("image");

router.get("/", isAuthenticated, PostController.getPosts);
router.get("/:id", PostController.getPostById);
router.post("/", upload, PostController.setPost);
router.put("/:id", upload, PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;