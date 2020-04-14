import axios from '../lib/axios';

export function getBlockState(params = {}) {
  return axios()
    .get(`/block/is-blocked`, { params })
    .then(result => result.data);
}

export function setBlockUser(params = {}) {
  return axios()
    .post(`/block/set`, params)
    .then(result => result.data);
}

export function unsetBlockUser(params = {}) {
  return axios()
    .delete(`/block/unset`, {params})
    .then(result => result.data);
}
