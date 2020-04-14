import axios from '../lib/axios';
export function getChat(params = {}) {
  return axios()
    .get(`/chat/get`, { params })
    .then(result => result.data);
}

export function deleteChat(id = 0) {
  return axios()
    .delete(`/chat/${id}`)
    .then(result => result.data);
}

export function getChats(params = {}) {
  return axios()
    .get(`/chat/list`, { params })
    .then(result => result.data);
}

export function setBlockFriend(params = {}) {
  return axios()
    .patch(`/chat/block-friend`, params)
    .then(result => result.data);
}

export function setUnblockFriend(params = {}) {
  return axios()
    .patch(`/chat/unblock-friend`, params)
    .then(result => result.data);
}
