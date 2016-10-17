import * as t from './actionTypes';
import Promise from "bluebird";
import "isomorphic-fetch";

export const fetchData = id => ({
  type: t.FETCH_DATA,
  payload: new Promise(resolve => {
    fetch(`/api/projects/${id}/data`)
      .then(response => {
        resolve(response.json());
      });
  })
});

export const setProjectState = (projectId, projectState) => ({
  type: t.SET_PROJECT_STATE,
  projectId,
  projectState
});
