import React from 'react';
import Person from './Person';

const Persons = ({ personsInfo }) => {
  return (
    <div>
      {personsInfo.map((p) => (
        <Person key={p.name} name={p.name} number={p.number} />
      ))}
    </div>
  );
};

export default Persons;
