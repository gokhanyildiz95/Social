import axios from '../lib/axios';
export function getSearch(params = {}) {
  return axios()
    .get(`search`, { params })
    .then(result => result.data).catch(err=> console.log(err));
}
