import * as t from './actionTypes';
import Promise from "bluebird";
import "isomorphic-fetch";

export const fetchResults = id => ({
  type: t.FETCH_RESULTS,
  payload: new Promise(resolve => {
    fetch(`/api/projects/${id}/results`)
      .then(response => {
        resolve(response.json());
      });
  })
});
