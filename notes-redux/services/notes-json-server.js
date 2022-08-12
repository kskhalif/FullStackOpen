import axios from 'axios';

const baseUrl = '/notes';

const get = async (important) => {
  const response = await axios.get(baseUrl);
  if (important === undefined) {
    return response.data;
  }
  if (important === true) {
    return response.data.filter(n => n.important);
  }
  return response.data.filter(n => !n.important);
};

const create = async (content) => {
  const response = await axios.post(baseUrl, { content, important: false });
  return response.data;
};

const update = async (note) => {
  const updatedNote = { ...note, important: !note.important }; 
  const response = await axios.put(`${baseUrl}/${note.id}`, updatedNote);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  get,
  create,
  update,
  remove
};
