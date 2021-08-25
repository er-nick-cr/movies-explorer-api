const router = require("express").Router();
const userRoutes = require("./users");
const movieRoutes = require("./movies");
const { auth } = require("../middlewares/auth");
const { NotFoundError } = require("../errors/NotFoundError");
const {
  userCredentialsValidation,
  userDataInputValidation,
} = require("../utils/celebrateValidation");
const { login, createUser } = require("../controllers/user");

router.post("/signin", userCredentialsValidation, login);
router.post("/signup", userDataInputValidation, createUser);
router.post("/signout", auth, (req, res) => {
  res.clearCookie("JWT");
  return res.json("Вы разлогинились");
});

router.use("/users", auth, userRoutes);
router.use("/movies", auth, movieRoutes);

router.use("*", auth, () => {
  throw new NotFoundError("Это не те роуты, которые Вам нужны");
});

module.exports = router;
