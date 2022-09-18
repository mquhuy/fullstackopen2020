import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  console.log(request);
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

const personMethods = { getAll, addPerson, removePerson, updatePerson };
export default personMethods;