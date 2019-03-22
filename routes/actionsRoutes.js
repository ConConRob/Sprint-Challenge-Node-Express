const express = require("express");
const Actions = require("../data/helpers/actionModel");

const routes = express.Router();
routes.use(express.json());

routes.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "A name and description is required to do this request"
    });
  } else {
    Actions.insert(req.body)
      .then(data => {
        if (data) {
          res.status(201).json(data);
        } else {
          res.status(409).json({ error: data });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Server error", error: err });
      });
  }
});

routes.get("/", (req, res) => {
  Actions.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "server error", error: err });
    });
});

routes.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "That action does not exist" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "server error", error: err });
    });
});

routes.delete("/:id", async (req, res) => {
  Actions.remove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "That action does not exist" });
      } else {
        res
          .status(202)
          .json({ message: "Action was deleted", id: req.params.id });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "server error", error: err });
    });
});

routes.put("/:id", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "A name and description is required to do this request"
    });
  } else {
    Actions.update(req.params.id, req.body)
      .then(data => {
        if (data) {
          res.status(201).json(data);
        } else {
          res.status(404).json({ message: "Action does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Server error", error: err });
      });
  }
});

module.exports = routes;
