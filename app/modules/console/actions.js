import * as t from './actionTypes';
import Promise from "bluebird";
import "isomorphic-fetch";

export const fetchProjects = () => ({
  type: t.FETCH_PROJECTS,
  payload: new Promise(resolve => {
    fetch('/api/projects')
      .then(response => {
        resolve(response.json());
      });
  })
});

export const toggleDrawer = () => ({
  type: t.TOGGLE_DRAWER
});

export const deleteProject = id => ({
  type: t.DELETE_PROJECT,
  payload: new Promise(resolve => {
    fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        resolve(response.json());
      });
  })
});

export const ackProjectDeleted = () => ({
  type: `${t.DELETE_PROJECT}_ACK`
});

export const addProject = url => ({
  type: t.ADD_PROJECT,
  payload: new Promise(resolve => {
    fetch('/api/projects', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        url
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        resolve(response.json());
      });
  })
});

export const ackProjectAdded = () => ({
  type: `${t.ADD_PROJECT}_ACK`
});
