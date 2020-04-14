import axios from '../lib/axios';
export function getFavorites(params = {}) {
  return axios()
    .get(`/favorite/get`, { params })
    .then(result => result.data);
}

export function getFavoriteCount(params = {}) {
  return axios()
    .get(`/favorite/count`, { params })
    .then(result => result.data);
}

export function getFavoriteState(params = {}) {
  return axios()
    .get(`/favorite/is-favorited`, { params })
    .then(result => result.data);
}

export function setFavoriteUser(params = {}) {
  return axios()
    .post(`/favorite/set`, params)
    .then(result => result.data);
}

export function unsetFavoriteUser(params = {}) {
  return axios()
    .delete(`/favorite/unset`, { params })
    .then(result => result.data);
}
