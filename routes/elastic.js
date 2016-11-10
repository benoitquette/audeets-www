const config = require('config');
const base64 = require('base-64');
const url = require('url');

const elasticConfig = config.get('elasticsearch');
const templateUrl = url.resolve(elasticConfig.connect.url, '_search/template');

/**
 * Executes a templated query on Elastic Search
 * @param {string} name the name of the template
 * @param {object} params the parameters to pass onto the query
 * @param {function} callback called with the query results or error
 */
function query(name, params, callback) {
  fetch(templateUrl, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      file: name,
      params
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + base64.encode(elasticConfig.connect.auth)
    })
  })
    .then(response => {
      return response.json();
    })
    .then(results => {
      callback(null, results);
    })
    .catch(err => callback(err));
}

module.exports = {
  query
};
