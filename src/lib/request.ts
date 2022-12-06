import { DiscordRequest } from '../../types';

const request: DiscordRequest = {
  post: async ({ url = '', token = '', data = {} }) => {
    console.log(`Calling ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log(`Response ${response.status} ${response.statusText}`);
    if (response.status > 201) {
      console.error('ERROR: Problem talking to endpoint. Response was');
      console.log(response.body);
      return null;
    }

    return response.json(); // parses JSON response into native JavaScript objects
  },

  get: async ({ url = '', token = '' }) => {
    console.log(`Calling ${url}`);
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Response ${response.status} ${response.statusText}`);

    return response.json(); // parses JSON response into native JavaScript objects
  },
};

export default request;
