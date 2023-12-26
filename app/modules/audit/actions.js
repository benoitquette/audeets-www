/* eslint-disable no-undef */
import * as t from './actionTypes'

export const fetchAudit = (id, date) => ({
  type: t.FETCH_AUDIT,
  payload: new Promise((resolve, reject) => {
    const url = `${hosts.apiProjects}/api/projects/${id}/audit/${date}`
    fetch(url, { method: 'GET' })
      .then((response) => {
        return response.json()
      })
      .then((results) => {
        resolve(results)
      })
      .catch(err => reject(err))
  }),
})

export const setFilterUrl = url => ({
  type: t.SET_FILTER_URL,
  url,
})

export const setUrls = urls => ({
  type: t.SET_URLS,
  urls,
})

export const setShowFailsOnly = showFailsOnly => ({
  type: t.SET_SHOW_FAILS_ONLY,
  showFailsOnly,
})
