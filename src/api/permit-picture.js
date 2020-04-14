import axios from '../lib/axios';
export function setPermitPicture(params = {}) {
  return axios()
    .post(`/permitpicture/`, params)
    .then(result => result.data);
}
 
export function setDefaultPermitPicture(params = {}) {
  return axios()
    .patch(`/permitpicture/set-default`, params)
    .then(result => result.data);
}

/* export function deleteProfilePicture(id = 0) {
  return axios()
    .delete(`/permitpicture/${id}`)
    .then(result => result.data);
}
   */