const express = require("express");
const Projects = require("../data/helpers/projectModel")

const routes = express.Router();
routes.use(express.json());

routes.post("/", (req, res) => {
  const {name, description} = req.body;
  if(!name || !description){
    res.status(400).json({ message: "A name and description is required to do this request" });
  } else {
    Projects.insert(req.body)
      .then( data => {
        if (data) {
          res.status(201).json(data);
        } else {
          res.status(409).json({ message: "Username is already taken" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Server error", error: err });
      });
  }
})

module.exports = routes;