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
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

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

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already in your phonebook. Replace the old number with the new one?`
      );

      if (!confirmUpdate) return;

      const updatedPerson = { ...existingPerson, number: newNumber };
      personService
        .update(updatedPerson, existingPerson.id)
        .then((returnedPerson) => {
          setNewName('');
          setNewNumber('');
          setPersons(
            persons.map((p) =>
              p.id !== returnedPerson.id ? p : returnedPerson
            )
          );
          showNotification(
            `Updated ${returnedPerson.name}'s number`,
            'success'
          );
        })
        .catch((error) => {
          showNotification(
            `${existingPerson.name} has been removed from the server`,
            'error'
          );
          setPersons(persons.filter((p) => p.id !== existingPerson.id));
        });
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      showNotification(`Added ${returnedPerson.name} to phonebook`, 'success');
    });
  };

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const getFilteredPersons = () => {
    const filteredPersons = persons.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    return filteredPersons;
  };

  const showNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
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
        notificationMessage={notificationMessage}
        notificationType={notificationType}
      />
      <h2>Numbers</h2>
      <Persons
        personsInfo={query ? getFilteredPersons() : persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
