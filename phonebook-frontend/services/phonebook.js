import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/phonebook';

const get = (filter = '') => {
    const request = axios.get(`${baseUrl}/${filter}`);
    return request.then(response => response.data);
};

const add = (newContact) => {
    const request = axios.post(baseUrl, newContact);
    return request.then(response => response.status);
};

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.status);
};

const update = (id, updatedContact) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedContact);
    return request.then(response => response.status);
};

export default { get, add, remove, update };
