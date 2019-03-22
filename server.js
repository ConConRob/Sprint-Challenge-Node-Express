const express = require("express");
const helmet = require("helmet")

const projectRoutes = require("./routes/projectsRoutes")

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectRoutes);

module.exports = server;