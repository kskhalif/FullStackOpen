import axios from 'axios';

const baseUrl = '/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
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

export default {
  getAll,
  create,
  update
};
