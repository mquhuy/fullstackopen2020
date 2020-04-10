import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const matchedPerson = persons.find((person) => person.name === newName);
    if (matchedPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPerson = {
          ...matchedPerson,
          number: newNumber,
        };
        personService
          .updatePerson(newPerson)
          .then((respondedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name === newName ? respondedPerson : person
              )
            );
            setSuccess(true);
            setNotification(`Updated ${newName}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setSuccess(false);
            setNotification(`${newName} was already removed from the server`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(persons.filter((person) => person.name !== newName));
          });
        return;
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService.addPerson(newPerson).then((respondedPerson) => {
      setPersons(persons.concat(respondedPerson));
      setSuccess(true);
      setNotification(`Added ${newName}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (id) => {
    const deleteUser = persons.find((person) => person.id === id);
    return () => {
      if (window.confirm(`Delete ${deleteUser.name}`)) {
        personService.removePerson(id);
        setPersons(persons.filter((person) => person.id !== id));
        setSuccess(true);
        setNotification(`Removed ${deleteUser.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    };
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
      <Notification message={notification} result={success} />
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
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
