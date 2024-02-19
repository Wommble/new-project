import { request } from "express";
import { UserModels } from "../../../models/user_models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getUsers = async (req, res) => {
  const users_data = await UserModels.find({});
  users_data.forEach((element) => {});

  res.status(200).json({ users: users_data });
};

export const signUp = async (req, res) => {
  const body = req.body;
  var checked = false;
  console.log(body);
  const check = await UserModels.find();

  check.forEach((element) => {
    if (body.email == element.email) {
      res.json({ status: false });
      checked = true;
      return checked;
    }
  });

  if (!checked) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    const cryptedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(getRandomInt(3000) + Date.now().toString() + Date.now());

    await UserModels.create({
      username: body.username,
      email: body.email,
      password: cryptedPassword,
      id: getRandomInt(3000) + Date.now().toString(),
      quizes: {},
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpCmLpoMqFEz6iDxJl_L4dJhqLqyhGej5qBg&usqp=CAU",
    });
    const result = await UserModels.findOne({ email: body.email });
    if (result) {
      const token = jwt.sign(
        {
          tok: body.email,
        },
        "MyTokenKey",
        { expiresIn: "30d" }
      );
      res.status(200).json({ status: true, id: result.id, token: token });
      return;
    }
    res.json({ status: false });
  }
};
export const logIn = async (req, res) => {
  const body = req.body;

  const users_data = await UserModels.findOne({ email: body.email });

  if (!users_data || users_data == null) {
    res.status({ stat: false });
    return;
  } else if (users_data == null) {
    res.status({ stat: false });
    return;
  } else {
    const compared = bcrypt.compare(users_data.password, body.password);
    if (users_data.email == body.email && compared) {
      const token = jwt.sign(
        {
          tok: users_data.email,
        },
        "MyTokenKey",
        { expiresIn: "30d" }
      );
      res.status(200).json({ stat: users_data.id, token: token });
      return;
    } else {
      res.status({ stat: false });
    }
  }
};
