import axios from '../lib/axios';
export function signUp({
  params
}) {
  return axios()
    .post(`user/register`, params)
    .then(result => result.data);
}

export function signIn({
  params
}) {
  return axios()
    .post(`user/login`, params)
    .then(result => result.data);
}


export function getUserInfo(params = {}) {
  return axios()
    .get(`user/info`, {
      params
    })
    .then(result => result.data);
}

export function getUserLoc(params = {}) {
  return axios()
    .get(`setting/konum`, {
      params
    })
    .then(result => result.data);
}

export function getUsers(params = {}) {
  return axios()
    .get(`user`, {
      params
    })
    .then(result => result.data);
}

export function getUser(userId = 0) {
  return axios()
    .get(`user/${userId}`)
    .then(result => result.data);
}

export function changeUserFullName(userId = 0, params) {
  return axios()
    .patch(`user/${userId}`, params)
    .then(result => result.data);
}


export function updateLocation({
  latitude,
  longitude
}) {
  return axios().patch(`user/update-location`, {
    latitude,
    longitude
  });
}
export const isEmailExist = async email => {
  const isExist = await axios()
    .get(`user/is-email-exists`, {
      params: {
        email
      }
    })
    .then(result => result.data);

  return isExist.exists;
};

export function resetPassword(params) {
  console.log(params);
  return axios()
    .post(`user/forgot-password`, params)
    .then(result => result.data);
}

export function settingSet(params) {
  console.log(params);
  return axios()
    .post(`setting/set`, params)
    .then(result => result.data);
}

export function getUserProfilePic(userId = 0) {
  return axios()
    .get(`profilepicture?userId=${userId}`)
    .then(result => result.data);
}