import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const removePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updatePerson = (updatedPerson) => {
  console.log(`${baseUrl}/${updatedPerson.id}`);
  const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
  return request.then((response) => response.data);
};

export default { getAll, addPerson, removePerson, updatePerson };