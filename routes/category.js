const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  categoryById,
  photo,
} = require("../controllers/category");

const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

router.get("/categories", getAll);

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

router.get("/category/photo/:categoryId", photo);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
