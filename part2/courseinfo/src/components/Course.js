import React from "react";

const Header = (props) => <h2>{props.course.name}</h2>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  );
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

const Total = ({ course }) => {
  const sum = course.parts.reduce((part1, part2) => ({
    exercises: part1.exercises + part2.exercises,
  }));
  return <b>Total of {sum.exercises} exercises</b>;
};

export default Course;
