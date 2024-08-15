import React, { useState, useReducer } from "react";
import "./App.css";

const initialState = {
  value: 0,
  history: [],
  future: [],
};

function reducer(state, action) {
  const { value, history, future } = state;

  switch (action.type) {
    case "INCREMENT":
      if (value < 150) {
        return {
          value: value + 1,
          history: [...history, value],
          future: [],
        };
      }
      return state;

    case "DECREMENT":
      if (value > 0) {
        return {
          value: value - 1,
          history: [...history, value],
          future: [],
        };
      }
      return state;

    case "UNDO":
      if (history.length > 0) {
        const previousValue = history[history.length - 1];
        return {
          value: previousValue,
          history: history.slice(0, -1),
          future: [value, ...future],
        };
      }
      return state;

    case "REDO":
      if (future.length > 0) {
        const nextValue = future[0];
        return {
          value: nextValue,
          history: [...history, value],
          future: future.slice(1),
        };
      }
      return state;

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });
  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });

  return (
    <div className="App">
      <h1>Number: {state.value}</h1>
      <div className="button-group">
        <button onClick={decrement}>-1</button>
        <button onClick={increment}>+1</button>
      </div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${(state.value / 150) * 100}%`,
          }}
        ></div>
      </div>
      <div className="undo-redo-group">
        <button onClick={undo} disabled={state.history.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={state.future.length === 0}>
          Redo
        </button>
      </div>
    </div>
  );
}

export default App;

