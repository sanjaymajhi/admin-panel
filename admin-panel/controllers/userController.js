var async = require("async");
var mongoose = require("mongoose");

var User = require("../models/user");

var validator = require("express-validator");

var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.profile = (req, res) => {
  User.findById(req.user_detail.id).exec((err, details) => {
    if (details) {
      res.status(200).json(details);
    } else {
      res.send("no token");
    }
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
        var salt = await bcrypt.genSalt(10);
        var password = await bcrypt.hash(req.body.password, salt);

        var user = new User({
          name: req.body.name,
          password: password,
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
  validator
    .body("email", "Invalid Username or Password")
    .isLength({ min: 5 })
    .trim(),
  validator
    .body("password", "Invalid Username or Password")
    .isLength({ min: 5 })
    .trim(),

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
    User.findOne({ email: req.body.email }, "email password admin").exec(
      async (err, result) => {
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
          const isMatch = await bcrypt.compare(
            req.body.password,
            result.password
          );
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
    );
  },
];

exports.user_list = (req, res) => {};

exports.disable_user = (req, res) => {};
