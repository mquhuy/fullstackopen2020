import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.course.name}</h1>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </>
  );
};

const Total = (props) => {
  const exercises = props.course.parts.map((part) => part.exercises);
  const sum = exercises.reduce((part1, part2) => part1 + part2, 0);
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
