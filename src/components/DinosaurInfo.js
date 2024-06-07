import React from "react";
import dinoItems from "../dino.json";
import "../App.css";

function DinosaurInfo({ onBack }) {
  return (
    <div className="dinosaur-info">
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
      <h1>Dinosaur Information</h1>
      <div className="dinosaur-list">
        {dinoItems.map((dino) => (
          <div key={dino.name} className="dinosaur-card">
            <img src={dino.image} alt={dino.name} />
            <h2>{dino.name}</h2>
            <p>{dino.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DinosaurInfo;
