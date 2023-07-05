import Axios from 'axios';
const APP_API_PATH = 'https://us-central1-fe-ws-test.cloudfunctions.net';

const axiosExtra = {
  setHeader(name, value, scopes = 'common') {
    for (let scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return;
      }
      this.defaults.headers[scope][name] = value;
    }
  },
};

const extendAxiosInstance = (axios) => {
  for (let key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios);
  }
};

const axios = Axios.create({
  baseURL: APP_API_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => {
    // const {
    //   data: {error, success},
    // } = response;

    return response;
  },
  function (error) {
    // const {
    //   data: {errors},
    //   status,
    //   statusText,
    // } = error.response;

    return Promise.reject(error);
  },
);

// Extend axios proto
extendAxiosInstance(axios);

export default axios;
