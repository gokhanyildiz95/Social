import axios from '../lib/axios';
export default function getCity(params = {}) {
  return axios()
    .get(`city?limit=81`, { params })
    .then(result => result.data);
}
