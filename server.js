const express = require("express");
const helmet = require("helmet");

const projectRoutes = require("./routes/projectsRoutes");
const actionRoutes = require("./routes/actionsRoutes");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);

module.exports = server;
