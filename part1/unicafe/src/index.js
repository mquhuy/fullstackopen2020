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

const Statistic = ({ feedback }) => {
  return (
    <tr>
      <td>{feedback.name}</td>
      <td>{feedback.state}</td>
    </tr>
  );
};

const Statistics = ({ feedbacks }) => {
  const totalNum = feedbacks
    .map((element) => element.state)
    .reduce((a, b) => a + b, 0);
  if (totalNum === 0) {
    return <p>No feedback given</p>;
  }
  const totalPoints = feedbacks
    .map((element) => element.point * element.state)
    .reduce((a, b) => a + b, 0);
  const positive = feedbacks
    .filter((element) => element.point > 0)
    .map((element) => element.state)
    .reduce((a, b) => a + b, 0);
  const total_feedbacks = feedbacks.concat([
    {
      name: "all",
      state: totalNum,
    },
    {
      name: "average",
      state: totalNum > 0 ? totalPoints / totalNum : 0,
    },
    {
      name: "positive",
      state: totalNum > 0 ? (positive / totalNum) * 100 + "%" : "0%",
    },
  ]);
  const stats = total_feedbacks.map((element) => (
    <Statistic key={element.name} feedback={element} />
  ));
  return (
    <table>
      <tbody>{stats}</tbody>
    </table>
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
      point: 1,
    },
    {
      name: "neutral",
      state: neutral,
      setState: setNeutral,
      point: 0,
    },
    {
      name: "bad",
      state: bad,
      setState: setBad,
      point: -1,
    },
  ];

  return (
    <div>
      <GiveFeedback feedbacks={reviews} />
      <h1>statistics</h1>
      <Statistics feedbacks={reviews} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
