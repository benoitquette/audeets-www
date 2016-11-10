import * as t from './actionTypes';
import Promise from "bluebird";

export const fetchAudit = (id, date) => ({
  type: t.FETCH_AUDIT,
  payload: new Promise((resolve, reject) => {
    fetch(`/api/projects/${id}/audit`, {method: 'GET'})
      .then(response => {
        return response.json();
      })
      .then(results => {
        resolve(results);
      })
      .catch(err => reject(err));
  })
});
