import React, { useEffect, useState } from "react";
import { cardSize } from "../constants";

const Player = ({
  player,
  isCurrentPlayer,
  drawCard,
  passTurn,
  ifCheckingWinner,
}) => {
  if (isCurrentPlayer || ifCheckingWinner)
    return (
      <div
        style={{
          width: 200,
          height: 300,
        }}
        className=" flex flex-col justify-start"
      >
        <h2>{player.name}</h2>
        <p>Score: {player.score}</p>
        <div
          style={{
            height: 200,
          }}
          className="hand flex flex-row relative  justify-start items-center "
        >
          {player.hand.map((card, index) => {
            return (
              <img
                className=" absolute "
                style={{
                  width: cardSize,
                  left: index * 40,
                  zIndex: index * 40,
                }}
                src={`https://cards.soward.net/images/fronts/${card.suit}_${card.rank}.svg`}
              />
            );
          })}
        </div>
        {isCurrentPlayer && (
          <div>
            <button onClick={drawCard}>Draw</button>
            <button onClick={passTurn}>Pass</button>
          </div>
        )}
      </div>
    );

  return (
    <div
      style={{
        width: 200,
        height: 300,
      }}
      className=" flex flex-col justify-start text-white"
    >
      <h2>{player.name}</h2>
      <p>Score: {isCurrentPlayer ? player.score : "***"}</p>
      <div
        style={{
          height: 200,
        }}
        className="hand flex flex-row relative  justify-start items-center   "
      >
        {player.hand.map((card, index) => {
          console.log(index, card);
          if (index < 2) {
            return (
              <img
                className=" absolute "
                style={{
                  width: cardSize,
                  left: index * 40,
                  zIndex: index * 40,
                }}
                src={`https://cards.soward.net/images/backs/blue2.svg`}
              />
            );
          } else {
            return (
              <img
                className=" absolute "
                style={{
                  width: cardSize,
                  left: index * 40,
                  zIndex: index * 40,
                }}
                src={`https://cards.soward.net/images/fronts/${card.suit}_${card.rank}.svg`}
              />
            );
          }
        })}
      </div>
      {isCurrentPlayer && (
        <div>
          <button onClick={drawCard}>Draw</button>
          <button onClick={passTurn}>Pass</button>
        </div>
      )}
    </div>
  );
};

export default Player;
