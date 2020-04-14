import axios from '../lib/axios';
// Arkadaşlık isteği gönderir
export function setFriendRequest(params) {
  return axios()
    .post(`/friend/request`, params)
    .then(result => result.data)
    .catch(err => console.log(err));
}

// Kullanıcılar arasındaki ilişkiyi getirir
export async function getRelation(params) {
  return axios()
    .get(`/friend/relation`, { params })
    .then(result => result.data)
    .catch(err => console.log(err));
}

// Kullanıcı onaylama isteğini api'a iletir
export async function setAcceptToRequest(params) {
  return axios()
    .post(`/friend/accept-to-request`, { params })
    .then(result => result.data)
    .catch(err => console.log(err)); 
}

// Kullanıcının arkadaşlık isteğini siler
export async function setDeclineToRequest(params) {
  return axios()
    .post(`/friend/decline-to-request`, { params })
    .then(result => result.data)
    .catch(err => console.log(err));
}

// Kullanıcının arkadaşlık isteklerini listeler
export async function getFriendRequest(params) {
  return axios()
    .get(`/friend/list-request`, { params })
    .then(result => result.data)
    .catch(err => console.log(err));
}