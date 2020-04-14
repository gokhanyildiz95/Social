import { distance } from '../lib/map';
import _ from 'lodash';

export const setDistanceToUsers = (users, location) => {
  users.map((user, key) => {
    const distanceObj = distance(
      {
        from: { latitude: location.latitude, longitude: location.longitude },
        to: { latitude: user.latitude, longitude: user.longitude }
      },
      true
    );

    users[key].distance = distanceObj.distance;
    users[key].distanceType = distanceObj.type;
  });

  return _.sortBy(users, ['distance']);
};

export const setDistanceToPosts = (posts, location) => {
  console.log("============= posts =================")
  console.log(posts)
  console.log("============= posts =================")
  /*
    content: "Merhaba😄😏🥰"
    createdAt: 1571006697071
    id: 158
    latitude: 38.6472065
    longitude: 39.1265562
    title: ""
    updatedAt: 1571006697071
    userId:
        city: 23
        confirmedEmailAt: null
        createdAt: 1566229486707
        email: "gokhanyildiz95@gmail.com"
        forgotPasswordHash: null
        fullname: "Gökhan yıldız "
        gender: 1
        id: 1
        lastseen: null
        latitude: 38.6473692
        longitude: 39.126402
        passwordHash: "e0173b918176d3fbfc59837f87a632ca"
        permitAccepted: 0
        phone: "05416878244"
        updatedAt: 1571652944658
  */
  /*
  ity: 23
confirmedEmailAt: null
createdAt: 1566229486707
distance: 5.7
distanceType: "km"
email: "gokhanyildiz95@gmail.com"
forgotPasswordHash: null
fullname: "Gökhan yıldız "
gender: 1
id: 1
lastseen: null
latitude: 38.6473692
longitude: 39.126402
passwordHash: "e0173b918176d3fbfc59837f87a632ca"
permitAccepted: 0
phone: "05416878244"
  */
  postlar = []
  posts.forEach(element => {
    plates = []
    element.plates.forEach(plate => {
      plates.push({
        "createdAt": plate.createdAt,
        "updatedAt": plate.updatedAt,
        "id": plate.id,
        "name": plate.name,
        "default": plate.default,
        "model": plate.model,
        "color": plate.color,
        "userId": plate.userId
      })
    });
    profilePictures = []
    element.profilePictures.forEach(photo => {
      profilePictures.push({
        "createdAt": photo.createdAt,
        "default": photo.default,
        "id": photo.id,
        "picture": photo.picture,
        "updatedAt": photo.updatedAt,
        "userId": photo.userId
      })
    });
    element.posts.forEach(post => {
      // console.log("plates")
      // console.log(plates)
      data = {
        "content": post.content,
        "createdAt": post.createdAt,
        "id": post.id,
        "latitude": post.latitude,
        "longitude": post.longitude,
        "title": post.title,
        "updatedAt": post.updatedAt,
        "userId": {
          "city": element.city,
          "confirmedEmailAt": element.confirmedEmailAt,
          "createdAt": element.createdAt,
          "email": element.email,
          "forgotPasswordHash": element.forgotPasswordHash,
          "fullname": element.fullname,
          "gender": element.gender,
          "id": element.id,
          "lastseen": element.lastseen,
          "latitude": element.latitude,
          "longitude": element.longitude,
          "passwordHash": element.passwordHash,
          "permitAccepted": element.permitAccepted,
          "phone": element.phone,
          "plates": plates,
          "profilePictures": profilePictures,
          "updatedAt": element.updatedAt
        }
      }
      postlar.push(data)
    });
  });

  console.log(postlar)
  postlar.reverse().map((post, key) => { 
    const distanceObj = distance(
      {
        from: { latitude: location.latitude, longitude: location.longitude },
        to: { latitude: post.latitude, longitude: post.longitude }
      },
      true
    );

    postlar[key].distance = distanceObj.distance;
    postlar[key].distanceType = distanceObj.type;
    postlar[key].time = timeDifference(new Date(), post.createdAt);
  });
 // console.log("end distance")
  return _.sortBy(postlar, ['distance']);
};

export const getUserPlate = user => {

  // console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
  // console.log(user.plates)
  if (user.plates) {
    const plate = _.find(user.plates, { default: 1 });
    // console.log(plate)
    // console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")

    return plate;
  }

  return '';
};

export const getUserProfilePicture = user => {
  const pictures = [];

  let defaultProfilePicture = _.find(user.profilePictures, { default: 1 });

  if (!defaultProfilePicture) {
    defaultProfilePicture = {
      picture: 'noone.png',
      mock: true
    };
  }

  pictures.push(defaultProfilePicture);

  _.map(user.profilePictures, pp => {
    if (!pp.default) {
      pictures.push(pp);
    }
  });

  return pictures;
};


export const timeDifference = (current, previous) => {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000 + 1) + ' saniye önce';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' dakika önce';
  }

  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' saat önce';
  }

  else if (elapsed < msPerMonth) {
    return 'yaklaşık ' + Math.round(elapsed / msPerDay) + ' gün önce';
  }

  else if (elapsed < msPerYear) {
    return 'yaklaşık ' + Math.round(elapsed / msPerMonth) + ' ay önce';
  }

  else {
    return 'yaklaşık ' + Math.round(elapsed / msPerYear) + ' yıl önce';
  }
}