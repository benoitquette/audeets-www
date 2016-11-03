import * as t from './actionTypes';
import Promise from "bluebird";
import {connect} from "@modules/search";
import _ from "lodash";
import moment from 'moment';
import constants from '@modules/constants';
import latestScoreQuery from "json!./searches/latestScore.json";
import rollingWeekQuery from "json!./searches/rollingWeek.json";
import latestAuditsQuery from "json!./searches/lastAudits.json";

export const fetchLatestScores = id => ({
  type: t.FETCH_LATEST_SCORES,
  payload: new Promise((resolve, reject) => {
    connect((err, client) => {
      if (err) return reject(err);
      const query = _.set(latestScoreQuery,
          'body.query.filtered.query.match.project', id);
      client.search(query)
        .then(res => {
          resolve(_.map(res.aggregations.categories.buckets, bucket => {
            const lastAudit = bucket.day.buckets[0];
            const checkedRules = _(lastAudit.scores.buckets)
              .find({key: 1}).doc_count;
            return {
              category: bucket.key,
              date: new Date(lastAudit.key_as_string),
              score: checkedRules * 100 / lastAudit.doc_count
            };
          }));
        }, err => reject(err));
    });
  })
});

export const fetchRollingWeek = id => ({
  type: t.FETCH_ROLLING_WEEK,
  payload: new Promise((resolve, reject) => {
    connect((err, client) => {
      if (err) return reject(err);
      const query = _.set(rollingWeekQuery,
        'body.query.filtered.query.match.project', id);
      client.search(query)
        .then(res => {
          resolve(_.map(res.aggregations.categories.buckets, bucket => {
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
        }, err => reject(err));
    });
  })
});

export const fetchRollingMonth = id => ({
  type: t.FETCH_ROLLING_MONTH,
  payload: new Promise((resolve, reject) => {
    resolve(
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
      }
    );
  })
});

export const fetchRollingYear = id => ({
  type: t.FETCH_ROLLING_YEAR,
  payload: new Promise((resolve, reject) => {
    resolve(
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
      }
    );
  })
});

export const setProjectState = (projectId, projectState) => ({
  type: t.SET_PROJECT_STATE,
  projectId,
  projectState
});

export const fetchLastAudits = id => ({
  type: t.FETCH_LAST_AUDITS,
  payload: new Promise((resolve, reject) => {
    const query = _.set(latestAuditsQuery,
      'body.query.filtered.query.match.project', id);
    connect((err, client) => {
      if (err) return reject(err);
      client.search(query)
        .then(res => {
          const categories = res.aggregations.categories.buckets;
          resolve(_.reduce(categories, (result, cat) => {
            return _.chain(result)
              .concat(result, _.map(cat.day.buckets, day => {
                return new Date(day.key_as_string);
              }))
              .uniqBy(date => {
                return moment(date).format(constants.shortDateFormat);
              })
              .value();
          }, []));
        });
    });
  })
});

