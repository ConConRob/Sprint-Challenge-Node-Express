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

routes.get("/", (req, res) => {
  Projects.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "server error", error: err });
    });
});

routes.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "That project does not exist" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "server error", error: err });
    });
});

routes.delete("/:id", async (req, res) => {
  // need to delete the posts

  Projects.remove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "That project does not exist" });
      } else {
        res
          .status(202)
          .json({ message: "Project was deleted", id: req.params.id });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "server error", error: err });
    });
});

routes.put("/:id", (req, res) => {
  const {name, description} = req.body;
  if(!name || !description){
    res.status(400).json({ message: "A name and description is required to do this request" });
  } else {
    Projects.update(req.params.id, req.body)
      .then(data => {
        if (data) {
          res.status(201).json(data);
        } else {
          res.status(404).json({ message: "Project does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Server error", error: err });
      });
  }
});

module.exports = routes;