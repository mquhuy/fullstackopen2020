import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ feedback }) => {
  const handleClick = () => feedback.setState(feedback.state + 1);
  return <button onClick={handleClick}>{feedback.name}</button>;
};

const GiveFeedback = ({ feedbacks }) => {
  const btns = feedbacks.map((element) => (
    <Button key={element.name} feedback={element} />
  ));
  return (
    <>
      <h1>give feedback</h1>
      {btns}
    </>
  );
};

const Counter = ({ feedback }) => (
  <p key={feedback.name}>
    {feedback.name} {feedback.state}
  </p>
);

const Statistics = ({ feedbacks }) => {
  const stats = feedbacks.map((element) => (
    <Counter key={element.name} feedback={element} />
  ));
  return (
    <>
      <h1>statistics</h1>
      {stats}
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const reviews = [
    {
      name: "good",
      state: good,
      setState: setGood,
    },
    {
      name: "neutral",
      state: neutral,
      setState: setNeutral,
    },
    {
      name: "bad",
      state: bad,
      setState: setBad,
    },
  ];

  return (
    <div>
      <GiveFeedback feedbacks={reviews} />
      <Statistics feedbacks={reviews} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
