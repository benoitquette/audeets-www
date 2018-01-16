import * as t from './actionTypes';
import _ from 'lodash';

const initialState = {
  list: [],
  urls: [],
  filterUrl: null,
  showFailsOnly: false,
  error: false,
  loading: false
};

/**
 * Implementation of the reducer
 * @param {Object} state the reducer's state
 * @param {Object} action the reducer's action
 * @return {Object} an new instance of the state
 */
export default function audit(state = initialState, action) {
  switch (action.type) {
    case `${t.FETCH_AUDIT}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false
      };
    case `${t.FETCH_AUDIT}_FULFILLED`: {
      let urls = _.chain(action.payload)
        .map(result => {
          return result.url;
        })
        .orderBy('url')
        .uniq()
        .value();
      let filterUrl = state.filterUrl;
      if (urls.length > 0) {
        filterUrl = urls[0];
      }
      return {
        ...state,
        loading: false,
        errors: false,
        list: action.payload,
        urls: urls,
        filterUrl
      };
    }
    case `${t.FETCH_AUDIT}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    case t.SET_FILTER_URL:
      return {
        ...state,
        filterUrl: action.url,
        loading: false,
        error: false
      };
    case t.SET_URLS:
      return {
        ...state,
        urls: action.urls,
        loading: false,
        error: false
      };
    case t.SET_SHOW_FAILS_ONLY:
      return {
        ...state,
        showFailsOnly: action.showFailsOnly,
        loading: false,
        error: false
      };
    default:
      return state;
  }
}
