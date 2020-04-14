import axios from '../lib/axios';
export function getPlate(params = {}) {
  return axios()
    .get(`plate`, { params })
    .then(result => result.data);
}

export const isPlateExist = async plate => {
  const plateList = await getPlate({ where: { name: plate } });
  return !!plateList.length;
};

export function setPlate(params = {}) {
  return axios()
    .post(`/plate/`, params)
    .then(result => result.data);
}

export function updatePlate(id = 0, params = {}) {
  return axios()
    .patch(`/plate/${id}`, params)
    .then(result => result.data);
}

export function deletePlate(id = 0) {
  return axios()
    .delete(`/plate/${id}`)
    .then(result => result.data);
}
