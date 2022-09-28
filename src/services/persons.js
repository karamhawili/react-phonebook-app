import axios from 'axios';
const baseURL = 'http://localhost:3002/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

const update = (newPerson, id) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default {
  getAll,
  create,
  update,
};
