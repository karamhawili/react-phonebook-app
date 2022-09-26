import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

//Phonebook, 2.6 - 2.10, FSO

//2.6 addition of a person to phonebook

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

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
