import axios from "axios";

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const config = () => {
  return { headers: { Authorization: token } };
};

const get = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const post = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config());
  return response.data;
};

const like = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`, null, config());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config());
  return response.data;
};

export default {
  setToken,
  get,
  post,
  like,
  remove
};
