var async = require("async");
var mongoose = require("mongoose");
var validator = require("express-validator");
var jwt = require("jsonwebtoken");

var User = require("../models/user");

exports.profile = (req, res) => {
  User.findById(req.user_detail.id).exec((err, details) => {
    if (details) {
      res.status(200).json(details);
    }
  });
};

exports.active = (req, res) => {
  User.findById({ _id: req.user_detail.id }).exec((err, result) => {
    if (err) {
      throw err;
    }
    var user = new User({
      name: result.name,
      password: result.password,
      email: result.email,
      last_active: Date.now(),
      admin: result.admin,
      _id: result._id,
    });
    User.findByIdAndUpdate(user._id, user, (err) => {
      if (err) {
        throw err;
      }
      res.json({ saved: "success" });
    });
  });
};

exports.add_user = [
  validator
    .body("name", "Name should have min 2 and max 30 characters")
    .trim()
    .isLength({ min: 2, max: 30 }),
  validator
    .body("password", "password length min 8 and max 15")
    .trim()
    .isLength({ min: 8, max: 15 }),
  validator.body("email", "Invalid Email").trim().isEmail(),

  validator.sanitizeBody("name").escape(),

  (req, res) => {
    if (!req.user_detail.admin) {
      res.json({
        saved: "unsuccessful",
        error: { msg: "You Are Not Admin" },
      });
      return;
    }
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        saved: "unsuccessful",
        errors: errors.array(),
      });
      return;
    }

    User.find({ email: req.body.email }, "email").exec(async (err, email) => {
      if (err) {
        throw err;
      }
      if (email.length) {
        res.json({
          saved: "unsuccessful",
          error: { msg: "Email already exists" },
        });
        return;
      } else {
        //As admin is setting password it does not needs to encrypt the password while saving in database
        var user = new User({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
        });

        await user.save((err) => {
          if (err) {
            throw err;
          }

          res.status(200).json({ saved: "success" });
        });
      }
    });
  },
];

exports.user_login_post = [
  validator.body("email", "Invalid Username").isLength({ min: 5 }).trim(),
  validator.body("password", "Invalid Password").isLength({ min: 5 }).trim(),

  validator.sanitizeBody("*").escape(),

  (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        saved: "unsuccessful",
        errors: errors.array(),
      });
      return;
    }
    User.findOne({ email: req.body.email }).exec(async (err, result) => {
      if (err) {
        throw err;
      }
      if (!result) {
        res.json({
          saved: "unsuccessful",
          error: { msg: "Email does not exists" },
        });
        return;
      } else {
        if (result.disabled) {
          res.json({
            saved: "unsuccessful",
            error: { msg: "Your account is blocked" },
          });
          return;
        } else {
          const isMatch = req.body.password === result.password;
          if (!isMatch) {
            res.json({
              saved: "unsuccessful",
              error: { msg: "Incorrect password" },
            });
            return;
          } else {
            var payload = {
              user: {
                id: result._id,
                admin: result.admin,
              },
            };
            await jwt.sign(
              payload,
              "sanjay",
              { expiresIn: 10000 },
              (err, token) => {
                if (err) {
                  throw err;
                }
                res
                  .status(200)
                  .json({ saved: "success", token, admin: result.admin });
              }
            );
          }
        }
      }
    });
  },
];

exports.user_list = (req, res) => {
  if (req.user_detail.admin) {
    User.find({ admin: false }).exec((err, result) => {
      if (err) {
        throw err;
      }
      res.json([...result]);
    });
  } else {
    res.json({
      saved: "unsuccessful",
      error: { msg: "Your are not admin" },
    });
    return;
  }
};

exports.disable_user = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, result) => {
    if (err) {
      throw err;
    }
    var user = new User({
      name: result.name,
      password: result.password,
      email: result.email,
      disabled: Boolean(true),
      _id: result._id,
    });
    await User.findByIdAndUpdate(user._id, user, (err) => {
      if (err) {
        throw err;
      }
      res.json({ saved: "success" });
    });
  });
};
