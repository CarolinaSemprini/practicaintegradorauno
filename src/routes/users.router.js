import express from "express";
import { userService } from "../services/users.service.js";
export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      payload: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

usersRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await userService.getOne(_id);
    if (user) {
      return res.status(200).json({
        status: "succes",
        msg: "product find.",
        payload: user,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      msg: error.message,
    });
  }
});

usersRouter.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteUser = await userService.deleteOne(_id);
    return res.status(200).json({
      status: "succes",
      msg: "user deleted.",
      payload: { deleteUser },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error.",
      msg: error.message,
      payload: {},
    });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const userCreated = await userService.createOne(body);
    return res.status(201).json({
      status: "succes",
      msg: "user created.",
      payload: { userCreated },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error.",
      msg: error.message,
      payload: {},
    });
  }
});

usersRouter.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const body = req.body;
    await userService.updateOne(_id, body);
    return res.status(201).json({
      status: "success",
      msg: "user updated",
      payload: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});
