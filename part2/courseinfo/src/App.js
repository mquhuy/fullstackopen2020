import React from "react";
import Course from "./components/Course";

const App = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map((element) => (
          <Course course={element} key={element.id} />
        ))}
      </div>
    </>
  );
};

export default App;
