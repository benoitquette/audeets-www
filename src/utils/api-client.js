// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

const client = async (endpoint, { body, ...customConfig } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) config.body = JSON.stringify(body);

  try {
    const response = await window.fetch(endpoint, config);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
};

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};

export default client;
