const express = require("express");
const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require("../controller/contentController");

const { protect, isAdmin } = require("../middleware/authHandler");

const router = express.Router();

router.route("/content").get(getAllContent).post(protect, createContent);

router
  .route("/content/:id")
  .get(protect, getContentById)
  .put(protect, updateContent)
  .delete(protect, isAdmin, deleteContent);

module.exports = router;
