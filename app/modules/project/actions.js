import * as t from './actionTypes';
import Promise from "bluebird";
import {connect} from "@modules/search";
import async from "async";
import _ from "lodash";
import latestScoreQuery from "json!./searches/latestScore.json";
import rollingWeekQuery from "json!./searches/rollingWeek.json";

export const fetchProjectMetrics = id => ({
  type: t.FETCH_DATA,
  payload: new Promise((resolve, reject) => {
    console.log('in fetchProjectMetrics');
    console.log(connect);
    connect((err, client) => {
      if (err) return reject(err);
      async.series([
        callback => {
          fetchLatestScore(client, id, callback);
        },
        callback => {
          fetchRollingWeek(client, id, callback);
        },
        callback => {
          fetchRollingMonth(client, id, callback);
        },
        callback => {
          fetchRollingYear(client, id, callback);
        }
      ], (err, results) => {
        if (err) return reject(err);
        resolve(_.reduce(results, (result, value) => {
          return _.merge(result, value);
        }, results[0]));
      });
    });
  })
});

function fetchLatestScore(client, id, callback) {
  const query = _.set(latestScoreQuery,
    'body.query.filtered.query.match.project', id);
  client.search(query)
    .then(res => {
      callback(null, _.map(res.aggregations.categories.buckets, bucket => {
        const lastAudit = bucket.day.buckets[0];
        const checkedRules = _(lastAudit.scores.buckets)
          .find({key: 1}).doc_count;
        let res = {};
        res[bucket.key] = {
          latest: {
            date: new Date(lastAudit.key_as_string),
            score: checkedRules * 100 / lastAudit.doc_count
          }
        };
        return res;
      }));
    }, err => callback(err));
}

function fetchRollingWeek(client, id, callback) {
  const query = _.set(rollingWeekQuery,
    'body.query.filtered.query.match.project', id);
  client.search(query)
    .then(res => {
      callback(null, _.map(res.aggregations.categories.buckets, bucket => {
        let results = {};
        results[bucket.key] = {
          rollingWeek: _.map(bucket.day.buckets, (day => {
            const checkedRules = _(day.scores.buckets)
              .find({key: 1}).doc_count;
            return {
              date: new Date(day.key_as_string),
              score: checkedRules * 100 / day.doc_count
            };
          }))
        };
        return results;
      }));
    }, err => callback(err));
  // callback(null,
  //   {
  //     performance: {
  //       rollingWeek: [
  //         {date: '2016-09-21T10:52:55.857Z', score: 65},
  //         {date: '2016-09-22T10:52:55.857Z', score: 65},
  //         {date: '2016-09-23T10:52:55.857Z', score: 65},
  //         {date: '2016-09-24T10:52:55.857Z', score: 65},
  //         {date: '2016-09-25T10:52:55.857Z', score: 66},
  //         {date: '2016-09-26T10:52:55.857Z', score: 75},
  //         {date: '2016-09-27T10:52:55.857Z', score: 75}
  //       ]
  //     }
  //   },
  //   {
  //     search: {
  //       rollingWeek: [
  //         {date: '2016-09-21T10:52:55.857Z', score: 45},
  //         {date: '2016-09-22T10:52:55.857Z', score: 45},
  //         {date: '2016-09-23T10:52:55.857Z', score: 45},
  //         {date: '2016-09-24T10:52:55.857Z', score: 45},
  //         {date: '2016-09-25T10:52:55.857Z', score: 56},
  //         {date: '2016-09-26T10:52:55.857Z', score: 65},
  //         {date: '2016-09-27T10:52:55.857Z', score: 65}
  //       ]
  //     }
  //   });
}

function fetchRollingMonth(client, id, callback) {
  callback(null,
    {
      performance: {
        rollingMonth: [
          {date: '2016-09-27T10:52:55.857Z', score: 65},
          {date: '2016-09-20T10:52:55.857Z', score: 65},
          {date: '2016-09-13T10:52:55.857Z', score: 65},
          {date: '2016-09-06T10:52:55.857Z', score: 65},
          {date: '2016-08-30T10:52:55.857Z', score: 65}
        ]
      }
    },
    {
      search: {
        rollingMonth: [
          {date: '2016-09-27T10:52:55.857Z', score: 65},
          {date: '2016-09-20T10:52:55.857Z', score: 65},
          {date: '2016-09-13T10:52:55.857Z', score: 55},
          {date: '2016-09-06T10:52:55.857Z', score: 55},
          {date: '2016-08-30T10:52:55.857Z', score: 50}
        ]
      }
    });
}

function fetchRollingYear(client, id, callback) {
  callback(null,
    {
      performance: {
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
    },
    {
      search: {
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
    });
}

export const setProjectState = (projectId, projectState) => ({
  type: t.SET_PROJECT_STATE,
  projectId,
  projectState
});

