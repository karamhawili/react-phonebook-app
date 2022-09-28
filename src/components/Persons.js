import React from 'react';
import Person from './Person';

const Persons = ({ personsInfo, deletePerson }) => {
  return (
    <div>
      {personsInfo.map((p) => (
        <Person
          key={p.name}
          name={p.name}
          number={p.number}
          deletePerson={() => deletePerson(p.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
