/* eslint-disable no-undef */
import * as t from './actionTypes'
import 'isomorphic-fetch'

export const fetchProjects = () => ({
  type: t.FETCH_PROJECTS,
  payload: new Promise((resolve) => {
    fetch(`${hosts.apiProjects}/api/projects`).then((response) => {
      resolve(response.json())
    })
  }),
})

export const toggleDrawer = () => ({
  type: t.TOGGLE_DRAWER,
})

export const createProject = (url, name) => ({
  type: t.CREATE_PROJECT,
  payload: new Promise((resolve) => {
    fetch(`${hosts.apiProjects}/api/projects`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        url,
        title: name,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      resolve(response.json())
    })
  }),
})

export const deleteProject = id => ({
  type: t.DELETE_PROJECT,
  payload: new Promise((resolve) => {
    fetch(`${hosts.apiProjects}/api/projects/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      resolve(response.json())
    })
  }),
})
