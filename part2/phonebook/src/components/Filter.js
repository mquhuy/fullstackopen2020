import React from "react";

const Filter = ({ filter, handlerFilterEnter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handlerFilterEnter} />
    </div>
  );
};

export default Filter;
