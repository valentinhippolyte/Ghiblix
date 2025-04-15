import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/jwt.js";

export const register = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({
            message: "user created!",
            username: user.username,
            userId: user._id,
            token: generateToken(user._id),
          });
        })
        .catch((e) => {
          if (e.code === 11000) {
            res
              .status(400)
              .json({ message: `User already exists : ${e}`, code: 11000 });
          } else {
            res.status(400).json({ message: `Something went wrong: ${e}` });
          }
        });
    })
    .catch((e) => {
      res.status(500).json({ message: e });
    });
};

export const login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user === null) {
        return res
          .status(401)
          .json({ message: "username or password not valid" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "username or password not valid" });
            } else {
              res.status(200).json({
                userId: user._id,
                username: user.username,
                token: generateToken(user._id),
              });
            }
          })
          .catch((e) => {
            res.status(500).json({ message: e });
          });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: e });
    });
};

export default { login, register };
