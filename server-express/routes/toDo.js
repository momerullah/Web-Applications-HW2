const expressFramework = require("express");
const jwtToken = require("jsonwebtoken");
const Task = require("../models/ToDo");

const secretKey = process.env.JWT_PRIVATE_KEY;


const route = expressFramework.Router();

route.use((req, resp, proceed) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    try {
      const tokenPayload = jwtToken.verify(authHeader, secretKey, { algorithms: ["RS256"] });
      req.user = tokenPayload;
      proceed();
    } catch (verificationError) {
      return resp.status(401).json({ error: "Invalid token" });
    }
  } else {
    return resp.status(401).json({ error: "No authorization token found" });
  }
});

route.post("/", async (req, resp) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id,
        dateCreated: new Date(),
        complete: false
    });

    try {
        const savedTask = await newTask.save();
        resp.status(201).json(savedTask);
    } catch (saveError) {
        resp.status(500).json({ error: "Could not save the task" });
    }
});

route.get("/", async (req, resp) => {
    const userTasks = await Task.find({ author: req.user.id }).exec();
    resp.status(200).json({ tasks: userTasks });
});

route.get("/:taskId", async (req, resp) => {
    const singleTask = await Task.findById(req.params.taskId).exec();
    resp.status(200).json(singleTask);
});

route.delete("/delete/:taskId", async (req, resp) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId).exec();
    resp.status(200).json(deletedTask);
});

route.patch("/toggle/:taskId", async (req, resp) => {
    const taskToUpdate = await Task.findById(req.params.taskId).exec();
    if (taskToUpdate) {
        taskToUpdate.complete = !taskToUpdate.complete;
        await taskToUpdate.save();
        resp.status(200).json(taskToUpdate);
    } else {
        resp.status(404).json({ error: "Task not found" });
    }
});

module.exports = route;
