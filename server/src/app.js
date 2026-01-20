const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
