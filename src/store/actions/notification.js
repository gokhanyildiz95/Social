import { getNotifications } from '../../api/notification';
import { readNotification, deleteNotification } from '../../api/notification/';

export const NOTIFICATION_FULFILLED = 'NOTIFICATION_FULFILLED';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';



// let newlist =   result.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
// // let newlist = result.data.sort((a, b) => a.createdAt - b.createdAt)
// let lastnewlist = newlist.reverse()
// return lastnewlist

export function setNotifications(where = {}) {
  where.status = { '!': 2 };

  return dispatch => {
    var list = []
    list =  getNotifications({ where })
    console.log(list,"notlist")

   if(list.length > 0) {
    let newlist =   list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    // let newlist = result.data.sort((a, b) => a.createdAt - b.createdAt)
    list = newlist.reverse();
   }

    dispatch({
      type: 'NOTIFICATION_2',
      payload: list
    });
  };
}

// export function setNotifications(where = {}) {
//   var newWhere = where
//   newWhere.status = { '!': 2 };
//   // where.status = { '!': 2 };

//   return dispatch => {

//     axios() 
//     .get(`/notification`, { ...newWhere })
//     .then(result => {
//         console.log(result.data,"resul,data")

//         let newlist =   result.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//       // let newlist = result.data.sort((a, b) => a.createdAt - b.createdAt)
//       let lastnewlist = newlist.reverse()

//       dispatch({
//         type: 'NOTIFICATION',
//         payload: lastnewlist
//       });
//     })
//     .catch(err => console.log(err));

    
//   };
// }

export function setReadNotification(notificationId) {
  return dispatch => {
    readNotification(notificationId);

    dispatch({
      type: READ_NOTIFICATION,
      payload: notificationId
    });
  };
}

export function setDeleteNotification(notificationId) {
  return dispatch => {
    deleteNotification(notificationId);

    dispatch({
      type: DELETE_NOTIFICATION,
      payload: notificationId
    });
  };
}
