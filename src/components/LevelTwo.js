import React, { useEffect, useState } from "react";
import Card from "./Card";
import dinoItems from "../dino.json";
import "../App.css";

function LevelTwo({ onBack }) {
  const [dinos, setDinos] = useState([]);
  const [dinoOne, setDinoOne] = useState(null);
  const [dinoTwo, setDinoTwo] = useState(null);
  const [time, setTime] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const chooseCard = (dino) => {
    dinoOne ? setDinoTwo(dino) : setDinoOne(dino);
  };

  const initGame = () => {
    const selectedDinos = dinoItems.slice(0, 4);
    const allDinos = [...selectedDinos, ...selectedDinos]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setDinos(allDinos);
    setTime(30);
    setGameStarted(true);
  };

  const resetGame = () => {
    setDinos((prevDinos) => {
      return prevDinos.map((item) => {
        if (item.matched) {
          return { ...item, matched: false };
        }
        return item;
      });
    });
    setDinoOne(null);
    setDinoTwo(null);
    setTimeout(() => {
      initGame();
    }, 1000);
  };

  useEffect(() => {
    let timer;
    if (time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      alert("Time's up! Game over.");
      onBack();
    }
    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    if (dinoOne && dinoTwo) {
      if (dinoOne.src === dinoTwo.src) {
        setDinos((prevDinos) => {
          return prevDinos.map((item) => {
            if (item.src === dinoOne.src) {
              return { ...item, matched: true };
            }
            return item;
          });
        });
      }
      setTimeout(() => {
        setDinoOne(null);
        setDinoTwo(null);
      }, 1000);
    }
    if (gameStarted && time > 0 && dinos.every((dino) => dino.matched)) {
      alert("You win!");
      onBack();
    }
  }, [dinoTwo, dinoOne]);

  return (
    <>
      <div className="header">
        <button className="back-button" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="timer">Time: {time}s</div>
        <button className="reset" onClick={resetGame}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1.002 7.935 1.007 9.425 4.747"></path>
            <path d="M20 4v5h-5"></path>
          </svg>
        </button>
      </div>
      <div className="game-block2">
        {dinos.map((dino) => (
          <Card
            key={dino.id}
            chooseCard={chooseCard}
            flipped={dino === dinoOne || dino === dinoTwo || dino.matched}
            dino={dino}
          />
        ))}
      </div>
    </>
  );
}

export default LevelTwo;
