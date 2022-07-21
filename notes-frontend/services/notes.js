import axios from 'axios';

const baseUrl = '/api/notes';
let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then(response => response.data);
};

const getImportant = () => {
    const request = axios.get(`${baseUrl}/important`);
    return request.then(response => response.data);
};

const create = async (newNote) => {
    const config = { 
        headers: { 
            Authorization: token 
        }, 
    };
    const response = await axios.post(baseUrl, { content: newNote }, config);
    return response.data;
};

const update = async (id) => {
    const config = { 
        headers: { 
            Authorization: token 
        }, 
    };
    const response = await axios.put(`${baseUrl}/${id}`, config);
    return response.data;
};

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.status);
};

export default { 
    getAll, 
    getImportant, 
    create, 
    update, 
    remove,
    setToken
};
