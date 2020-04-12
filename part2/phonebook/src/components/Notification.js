import React from "react";

const Notification = ({ message, result }) => {
  if (message === null) {
    return null;
  }
  const notiStyles = {
    background: "lightgrey",
    fontSize: "20px",
    padding: "10px",
    borderStyle: "solid",
    boderRadius: "5px",
    marginBottom: "10px",
  };

  return (
    <div style={notiStyles} className={`noti-${result ? "success" : "error"}`}>
      {message}
    </div>
  );
};

export default Notification;
