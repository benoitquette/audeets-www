/* eslint-disable no-undef */
import * as t from './actionTypes';

export const fetchAuditsList = id => ({
  type: t.FETCH_AUDITS_LIST,
  payload: new Promise((resolve, reject) => {
    fetch(`${hosts.apiProjects}/api/projects/${id}/audits`, {method: 'GET'})
      .then(response => {
        return response.json();
      })
      .then(results => {
        resolve(results);
      })
      .catch(err => reject(err));
  })
});
