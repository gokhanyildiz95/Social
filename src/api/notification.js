import axios from '../lib/axios';

export function  getNotifications(params) { 
  return axios()
    .get(`/notification`, { params })
    .then(result => result.data.reverse())
    .catch(err => console.log(err));
}

export function deleteNotification(notificationId = 0) {
  return axios()
    .patch(`/notification/${notificationId}`, { status: 2 })
    .then(result => result.data)
    .catch(err => console.log(err));
}

export function readNotification(notificationId = 0) {
  return axios()
    .patch(`/notification/${notificationId}`, { status: 1 })
    .then(result => result.data)
    .catch(err => console.log(err));
}
