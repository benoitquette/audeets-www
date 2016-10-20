const express = require('express');
const mongoose = require('mongoose');

const Project = mongoose.model('Project');
const router = express.Router(); // eslint-disable-line new-cap

router.route('/projects')
  .get((req, res, next) => {
    Project.find((err, projects) => {
      if (err) return next(err);
      return res.json(projects);
    });
  })
  .post((req, res, next) => {
    let project = new Project();
    project.url = req.body.url;
    project.save(err => {
      if (err) return next(err);
      res.json(project);
    });
  });
router.route('/projects/:id')
  .delete((req, res, next) => {
    Project
      .findById(req.params.id)
      .remove(err => {
        if (err) return next(err);
        return res.send({id: req.params.id});
      });
  });

module.exports = router;
