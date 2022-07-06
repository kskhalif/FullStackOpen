import axios from 'axios';
const baseUrl = '/api/notes';

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then(response => response.data);
};

const getImportant = () => {
    const request = axios.get(`${baseUrl}/important`);
    return request.then(response => response.data);
};

const create = (newNote) => {
    const request = axios.post(baseUrl, { content: newNote } );
    return request.then(response => response.data);
};

const update = (id) => {
    const request = axios.put(`${baseUrl}/${id}`);
    return request.then(response => response.data);
};

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.status);
};

export default { getAll, getImportant, create, update, remove };
