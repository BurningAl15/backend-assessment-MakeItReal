const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, isAuthenticated } = require("../middlewares");
const { favExistsById } = require("../helpers/db-validators");

const {
  favShowById,
  favsShowAll,
  favsCreate,
  favsDelete,
} = require("../controllers/fav");

const router = Router();

router.get("/:id", [isAuthenticated, validateFields], favShowById);

router.get("/", [isAuthenticated, validateFields], favsShowAll);

router.post("/", [isAuthenticated, validateFields], favsCreate);

router.delete(
  "/:id",
  [
    isAuthenticated,
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(favExistsById),
    validateFields,
  ],
  favsDelete
);

module.exports = router;
