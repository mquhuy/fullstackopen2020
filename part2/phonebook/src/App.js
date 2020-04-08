import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersons = persons.concat({
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    });
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
  };

  const handleNameEnter = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberEnter = (event) => {
    setNewNumber(event.target.value);
  };

  const handlerFilterEnter = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handlerFilterEnter={handlerFilterEnter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameEnter={handleNameEnter}
        newNumber={newNumber}
        handleNumberEnter={handleNumberEnter}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
