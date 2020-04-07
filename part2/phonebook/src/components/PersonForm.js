import React from "react";

const PersonForm = ({
  addPerson,
  newName,
  handleNameEnter,
  newNumber,
  handleNumberEnter,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameEnter} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberEnter} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
