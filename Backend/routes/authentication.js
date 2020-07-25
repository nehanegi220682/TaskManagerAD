var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  signout,
  isSignedIn,
  signup,
  signin
} = require("../controllers/authentication");

//signup validation
router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", " valid email is required ").isEmail(),
    check("password", "password should be atleast 3 character").isLength({
      min: 3
    })
  ],
  signup
);

//signin validation
router.post(
  "/signin",
  [
    check("email", "email is required ").isEmail(),
    check("password", "password field is required").isLength({ min: 3 })
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
