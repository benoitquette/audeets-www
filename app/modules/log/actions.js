/* eslint-disable no-undef */
import * as t from './actionTypes';
import Promise from "bluebird";

export const fetchAuditsList = id => ({
  type: t.FETCH_AUDITS_LIST,
  payload: new Promise((resolve, reject) => {
    fetch(`${hosts.api}/api/projects/${id}/audits`, {method: 'GET'})
      .then(response => {
        return response.json();
      })
      .then(results => {
        resolve(results);
      })
      .catch(err => reject(err));
  })
});
