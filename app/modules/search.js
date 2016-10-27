import elasticsearch from "elasticsearch";
import "isomorphic-fetch";

/**
 * Fetches the ElasicSearcg config from the server, creates a search client
 * and returns it to the callback.
 * @param {function} callback takes 2 parameters: an error and the client
 */
export function connect(callback) {
  console.log('fetching config...');
  fetch(`/config/elasticsearch`, {
    method: 'GET',
    mode: 'cors'
  })
    .then(response => {
      return response.json();
    })
    .then(config => {
      console.log(config);
      callback(null, new elasticsearch.Client({
        host: config.connect,
        log: config.log
      }));
    })
    .catch(err => callback(err));
}
