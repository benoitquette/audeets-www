/* eslint-disable no-undef */
import * as t from './actionTypes';
import Promise from "bluebird";

export const fetchLatestScores = id => ({
  type: t.FETCH_LATEST_SCORES,
  payload: new Promise((resolve, reject) => {
    fetch(`${hosts.apiProjects}/api/projects/${id}/latestscore`, {method: 'GET'})
      .then(response => {
        return response.json();
      })
      .then(results => {
        resolve(results);
      })
      .catch(err => reject(err));
  })
});

export const fetchRollingWeek = id => ({
  type: t.FETCH_ROLLING_WEEK,
  payload: new Promise((resolve, reject) => {
    fetch(`${hosts.apiProjects}/api/projects/${id}/rollingweek`,
      {method: 'GET'})
      .then(response => {
        return response.json();
      })
      .then(results => {
        resolve(results);
      })
      .catch(err => reject(err));
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
    fetch(`${hosts.apiProjects}/api/projects/${id}/lastaudits`, {method: 'GET'})
      .then(response => {
        return response.json();
      })
      .then(results => {
        resolve(results);
      })
      .catch(err => reject(err));
  })
});

