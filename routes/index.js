const express = require('express');
const mongoose = require('mongoose');

const Project = mongoose.model('Project');
const Result = mongoose.model('Result');
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
router.route('/projects/:id/results')
  .get((req, res, next) => {
    const query = Object.assign({}, {project: req.params.id}, req.body);
    Result.find(query, (err, results) => {
      if (err) return next(err);
      return res.json(results);
    });
  });
router.route('/projects/:id/data')
  .get((req, res, next) => {
    return res.json([
      {
        category: 'performance',
        latest: {
          date: '2016-09-27T10:52:55.857Z',
          score: 65
        },
        rollingWeek: [
          {date: '2016-09-21T10:52:55.857Z', score: 65},
          {date: '2016-09-22T10:52:55.857Z', score: 65},
          {date: '2016-09-23T10:52:55.857Z', score: 65},
          {date: '2016-09-24T10:52:55.857Z', score: 65},
          {date: '2016-09-25T10:52:55.857Z', score: 66},
          {date: '2016-09-26T10:52:55.857Z', score: 75},
          {date: '2016-09-27T10:52:55.857Z', score: 75}
        ],
        rollingMonth: [
          {date: '2016-09-27T10:52:55.857Z', score: 65},
          {date: '2016-09-20T10:52:55.857Z', score: 65},
          {date: '2016-09-13T10:52:55.857Z', score: 65},
          {date: '2016-09-06T10:52:55.857Z', score: 65},
          {date: '2016-08-30T10:52:55.857Z', score: 65}
        ],
        rollingYear: [
          {date: '2016-09-27T10:52:55.857Z', score: 65},
          {date: '2016-08-27T10:52:55.857Z', score: 65},
          {date: '2016-07-27T10:52:55.857Z', score: 65},
          {date: '2016-06-27T10:52:55.857Z', score: 60},
          {date: '2016-05-27T10:52:55.857Z', score: 60},
          {date: '2016-04-27T10:52:55.857Z', score: 55},
          {date: '2016-03-27T10:52:55.857Z', score: 60},
          {date: '2016-02-27T10:52:55.857Z', score: 50},
          {date: '2016-01-27T10:52:55.857Z', score: 47},
          {date: '2015-12-27T10:52:55.857Z', score: 45},
          {date: '2015-11-27T10:52:55.857Z', score: 45},
          {date: '2015-10-27T10:52:55.857Z', score: 40}
        ]
      },
      {
        category: 'search',
        latest: {date: '2016-09-27T10:52:55.857Z', score: 65},
        rollingWeek: [
          {date: '2016-09-21T10:52:55.857Z', score: 45},
          {date: '2016-09-22T10:52:55.857Z', score: 45},
          {date: '2016-09-23T10:52:55.857Z', score: 45},
          {date: '2016-09-24T10:52:55.857Z', score: 45},
          {date: '2016-09-25T10:52:55.857Z', score: 56},
          {date: '2016-09-26T10:52:55.857Z', score: 65},
          {date: '2016-09-27T10:52:55.857Z', score: 65}
        ],
        rollingMonth: [
          {date: '2016-09-27T10:52:55.857Z', score: 65},
          {date: '2016-09-20T10:52:55.857Z', score: 65},
          {date: '2016-09-13T10:52:55.857Z', score: 55},
          {date: '2016-09-06T10:52:55.857Z', score: 55},
          {date: '2016-08-30T10:52:55.857Z', score: 50}
        ],
        rollingYear: [
          {date: '2016-09-27T10:52:55.857Z', score: 65},
          {date: '2016-08-27T10:52:55.857Z', score: 65},
          {date: '2016-07-27T10:52:55.857Z', score: 65},
          {date: '2016-06-27T10:52:55.857Z', score: 60},
          {date: '2016-05-27T10:52:55.857Z', score: 60},
          {date: '2016-04-27T10:52:55.857Z', score: 55},
          {date: '2016-03-27T10:52:55.857Z', score: 60},
          {date: '2016-02-27T10:52:55.857Z', score: 50},
          {date: '2016-01-27T10:52:55.857Z', score: 47},
          {date: '2015-12-27T10:52:55.857Z', score: 45},
          {date: '2015-11-27T10:52:55.857Z', score: 45},
          {date: '2015-10-27T10:52:55.857Z', score: 40}
        ]
      }
    ]);
  });

module.exports = router;
