import React, { Component } from 'react';

function Alert(props) {
  return <div className="alert">
    {props.text}
  </div>;
}

export default Alert;
