import axios from '../lib/axios';
export default function upload(params) {
  return axios()
    .post(`file/upload`, params)
    .then(result => result.data);
}
