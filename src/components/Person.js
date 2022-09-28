import React from 'react';

const Person = ({ name, number, deletePerson }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '60%',
        padding: 8,
        borderBottom: '1px solid lightgrey',
      }}
    >
      <div>
        {name} {number}
      </div>
      <button onClick={deletePerson}>delete</button>
    </div>
  );
};

export default Person;
