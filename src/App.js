import React, { useState } from "react";
import "./App.css";
import LevelSelect from "./components/LevelSelect";
import LevelOne from "./components/LevelOne";
import LevelTwo from "./components/LevelTwo";
import LevelThree from "./components/LevelThree";

function App() {
  const [level, setLevel] = useState(null);
  const [start, setStart] = useState(false);

  const handleBack = () => {
    setStart(false);
    setLevel(null);
  };

  return (
    <>
      {!start ? (
        <button className="start-game" onClick={() => setStart(true)}>
          Start Game
        </button>
      ) : level ? (
        level === "easy" ? (
          <LevelOne onBack={handleBack} />
        ) : level === "medium" ? (
          <LevelTwo onBack={handleBack} />
        ) : (
          <LevelThree onBack={handleBack} />
        )
      ) : (
        <LevelSelect
          onSelectLevel={(selectedLevel) => {
            setLevel(selectedLevel);
            setStart(true);
          }}
          onBack={handleBack}
        />
      )}
    </>
  );
}

export default App;
