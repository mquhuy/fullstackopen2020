import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const vote = (number) => {
    const cp_votes = [...votes];
    cp_votes[number] += 1;
    setVotes(cp_votes);
  };
  const randomChange = () => {
    const randomNum = Math.floor(Math.random() * props.anecdotes.length);
    console.log(randomNum);
    setSelected(randomNum);
  };
  const indexOfMaxVote = votes.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
        <br />
        has {votes[selected]} votes
      </div>
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={randomChange}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>
        {props.anecdotes[indexOfMaxVote]}
        <br />
        has {votes[indexOfMaxVote]} votes
      </div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
