export const distance = ({ from, to }, mToKm = false) => {
  const meter = 6371; // km (change this constant to get miles)
  const { latitude: fromLatitude, longitude: fromLongitude } = from;
  const { latitude: toLatitude, longitude: toLongitude } = to;

  const distanceLatitude = ((toLatitude - fromLatitude) * Math.PI) / 180;
  const distanceLongitude = ((toLongitude - fromLongitude) * Math.PI) / 180;

  const distance =
    Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
    Math.cos((fromLatitude * Math.PI) / 180) *
      Math.cos((toLatitude * Math.PI) / 180) *
      Math.sin(distanceLongitude / 2) *
      Math.sin(distanceLongitude / 2);

  const calculate = 2 * Math.atan2(Math.sqrt(distance), Math.sqrt(1 - distance));
  const distanceMeter = meter * calculate;
  let distanceObj = { distance: distanceMeter, type: 'm' };
  if (distanceMeter > 1) {
    distanceObj = { distance: parseFloat(distanceMeter.toFixed(1)), type: 'km' };
  } else if (distanceMeter <= 1) {
    distanceObj = { distance: parseFloat((distanceMeter * 1000).toFixed(1)), type: 'm' };
  }

  if (mToKm && distanceObj.type == 'm') {
    distanceObj = { distance: parseFloat((distanceObj.distance / 1000).toFixed(1)), type: 'km' };
  }

  return distanceObj;
};

export const getAreaCoordinates = ({ latitude, longitude }) => {
  const areaRate = 0.07;
  const rateLat = (90 / 100) * areaRate;
  const rateLong = (180 / 100) * areaRate;

  const latStart = latitude - rateLat;
  const longStart = longitude - rateLong;

  const latEnd = latitude + rateLat;
  const longEnd = longitude + rateLong;

  return {
    polygon: [
      {
        latitude: latStart,
        longitude: longitude - rateLong
      },
      {
        latitude: latitude + rateLat,
        longitude: longStart
      },
      {
        latitude: latEnd,
        longitude: longitude + rateLong
      },
      {
        latitude: latitude - rateLat,
        longitude: longEnd
      }
    ],
    area: {
      latStart,
      longStart,
      latEnd,
      longEnd
    }
  };
};

export const isInCoordinate = (
  { latitude: areaLatitude, longitude: areaLongitude },
  { latitude, longitude }
) => {
  const {
    area: { latStart, longStart, latEnd, longEnd }
  } = getAreaCoordinates({
    latitude: areaLatitude,
    longitude: areaLongitude
  });

  return latitude > latStart && latitude < latEnd && longitude > longStart && longitude < longEnd;
};
