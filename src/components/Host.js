import React from "react";
import { cardSize } from "../constants";

const Host = ({
  host,
  drawCard,
  isCurrentPlayer,
  ifCheckingWinner,
  checkGame,
}) => {
  if (isCurrentPlayer || ifCheckingWinner)
    return (
      <div
        style={{
          width: 200,
          height: 300,
        }}
        className=" flex flex-col   justify-start"
      >
        <h2>{host.name}</h2>
        <p>Score: {host.score}</p>
        <div
          style={{
            height: 200,
          }}
          className="hand flex flex-row relative  justify-start items-center  "
        >
          {host.hand.map((card, index) => {
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
        {isCurrentPlayer && !ifCheckingWinner && (
          <div>
            <button onClick={drawCard}>Draw</button>
            <button onClick={checkGame}>Check Winner</button>
          </div>
        )}
      </div>
    );
  else {
    return (
      <div
        style={{
          width: 200,
          height: 300,
        }}
        className=" flex flex-col   text-white justify-start"
      >
        <h2>{host.name}</h2>
        <p>Score: ***</p>
        <div
          style={{
            height: 200,
          }}
          className="hand flex flex-row relative  justify-start items-center  "
        >
          {host.hand.map((card, index) => {
            console.log(index, card);
            if (index < 1) {
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
      </div>
    );
  }
};

export default Host;
