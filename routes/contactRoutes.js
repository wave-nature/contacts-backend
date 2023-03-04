const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.route("/").post(protect, createContact).get(protect, getContacts);
router
  .route("/:id")
  .get(protect, getContact)
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;
