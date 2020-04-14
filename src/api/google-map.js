import axios from 'axios';
import _ from 'lodash';
import { GOOGLE_API, GOOGLE_MAP_API_KEY } from '../config/env';

export const addApiKey = (params = {}) => ({ ...params, key: GOOGLE_MAP_API_KEY });
export const addLanguage = (params = {}) => ({ ...params, language: 'tr' });

function getAddress(results) {
  let address = {};
  _.map(results, result => {
    const isAddress = _.filter(result.types, type => type === 'administrative_area_level_2');

    if (isAddress.length) {
      let [county, city, country] = result.formatted_address.split(',');

      if (county.indexOf('/')) {
        country = city;
        [county, city] = county.split('/');
      }

      address.county = county;
      address.city = city;
      address.country = country;
    }
  });

  _.map(address, (item, key) => (address[key] = _.trim(item)));
console.log("address")
console.log(address)
  return address;
}

// if you you want Country, City data you must send "latlng" param
export function getGeocode(params = {}) {
  params = addApiKey(params);
  params = addLanguage(params);

  return axios
    .get(`${GOOGLE_API}geocode/json`, { params })
    .then(result => {
      console.log(result);
      return result;
    })
    .then(result => result.data)
    .then(data => data.results)
    .then(results => getAddress(results));
}
