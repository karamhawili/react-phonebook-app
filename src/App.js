import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    personService.getAll().then((returnedPersons) => {
      console.log('promise fulfilled');
      setPersons(returnedPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (nameAlreadyExists(newName, persons)) {
      alert(`${newName} already exists in phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const nameAlreadyExists = (personName, existingPersons) => {
    return !!existingPersons.find((n) => n.name === personName);
  };

  const getFilteredPersons = () => {
    const filteredPersons = persons.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    return filteredPersons;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter query={query} handleQueryChange={handleQueryChange} />
      <br />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        onSubmitForm={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsInfo={query ? getFilteredPersons() : persons} />
    </div>
  );
};

export default App;
