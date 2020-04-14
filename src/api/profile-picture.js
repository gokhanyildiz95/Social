import axios from '../lib/axios';
export function setProfilePicture(params = {}) {
  return axios()
    .post(`/profilepicture/`, params)
    .then(result => result.data);
}

export function setDefaultProfilePicture(params = {}) {
  return axios()
    .patch(`/profilepicture/set-default`, params)
    .then(result => result.data);
}

export function deleteProfilePicture(id = 0) {
  return axios()
    .delete(`/profilepicture/${id}`)
    .then(result => result.data);
}
