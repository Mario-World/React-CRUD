import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Format time like "0:00", "1:09"
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Start or stop the stopwatch
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  // Reset the stopwatch
  const handleReset = () => {
    clearInterval(timerRef.current);
    setSeconds(0);
    setIsRunning(false);
  };

  // Clear timer when component unmounts
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="app">
      <h1>Stopwatch</h1>

      {/* ✅ Make sure Cypress sees "Time: 0:00" */}
      <p className="time">Time: {formatTime(seconds)}</p>

      <div className="buttons">
        <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
