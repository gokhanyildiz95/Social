import axios from '../lib/axios';
export function getChatMessages(params = {}) {
  return axios()
    .get(`/chatmessage`, { params })
    .then(result => result.data);
}

export function setChatMessage(params = {}) {
  return axios()
    .post(`/chatmessage/set`, { params })
    .then(result => result.data);
}

export function setReadAllChatMessages(params = {}) {
  return axios()
    .patch(`/chatmessage/readAll`, params)
    .then(result => result.data);
}

export function setReadChatMessage(params = {}) {
  return axios()
    .patch(`/chatmessage/read`, params)
    .then(result => result.data);
}
