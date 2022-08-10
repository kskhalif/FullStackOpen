import axios from 'axios';

const baseUrl = '/api/notes';
let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const config = () => {
    return { headers: { Authorization: token } };
};

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/all`);
    return response.data;
};

const getImportant = async () => {
    const response = await axios.get(`${baseUrl}/important`);
    return response.data;
};

const getNonimportant = async () => {
  const response = await axios.get(`${baseUrl}/nonimportant`);
  return response.data;
};

const create = async (newNote) => {
    const response = await axios.post(baseUrl, { content: newNote }, config());
    return response.data;
};

const update = async (id) => {
    const response = await axios.put(`${baseUrl}/${id}`, null, config());
    return response.data;
};

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, config());
    return response.data;
};

export default { 
    getAll, 
    getImportant,
    getNonimportant,
    create, 
    update, 
    remove,
    setToken
};
