import axios from '../lib/axios';
export function sharePost(params = {}) {
    return axios()
    .post(`/post`, params)
    .then(result => result.data);
}

export function getPosts() {
    return axios()
    .get(`/post/get`)
    .then(result => result.data);
}