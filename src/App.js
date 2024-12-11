// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./components/Player";
import Host from "./components/Host";
const App = () => {
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", hand: [], score: 0 },
    { id: 2, name: "Player 2", hand: [], score: 0 },
    { id: 3, name: "Player 3", hand: [], score: 0 },
  ]);
  const [host, setHost] = useState({ name: "Host", hand: [], score: 0 });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
  const [ifCheckingWinner, setIfCheckingWinner] = useState(false);

  const startGame = () => {
    alert(
      "Welcome to Blackjack! The goal is to get as close to 21 as possible without going over. Each player will be dealt two cards, and you can draw more cards to improve your score. Face cards are worth 10, aces are worth 11, and number cards are worth their value. If your score exceeds 21, you lose. The player with the highest score under 21 wins! Let's begin."
    );
    setCurrentPlayerIndex(0);
  };

  useEffect(() => {
    if (currentPlayerIndex === -1) return;

    const nextPlayerName =
      currentPlayerIndex < 3 ? `player ${currentPlayerIndex + 1}` : "host";

    alert(`It's ${nextPlayerName}'s turn. Pass it to the player`);
  }, [currentPlayerIndex]);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const dealInitialCards = (deck, players, host) => {
    const updatedPlayers = players.map((player) => {
      const hand = [deck.pop(), deck.pop()];
      const score = hand.reduce(
        (total, card) => total + calculateCardValue(card),
        0
      );
      return { ...player, hand, score };
    });

    const hostHand = [deck.pop(), deck.pop()];
    const hostScore = hostHand.reduce(
      (total, card) => total + calculateCardValue(card),
      0
    );

    return {
      updatedPlayers,
      updatedHost: { ...host, hand: hostHand, score: hostScore },
    };
  };

  const resetGame = () => {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
      "ace",
    ];
    const newDeck = shuffle(
      suits.flatMap((suit) => ranks.map((rank) => ({ rank, suit })))
    );

    const { updatedPlayers, updatedHost } = dealInitialCards(
      newDeck,
      players,
      host
    );

    setDeck(newDeck);
    setPlayers(updatedPlayers);
    setHost(updatedHost);
    setCurrentPlayerIndex(-1);
    setIfCheckingWinner(false);
  };

  const drawCard = () => {
    if (deck.length === 0) return;

    const card = deck.pop();
    if (currentPlayerIndex < players.length) {
      const updatedPlayers = [...players];
      const currentPlayer = updatedPlayers[currentPlayerIndex];
      currentPlayer.hand.push(card);
      currentPlayer.score += calculateCardValue(card);
      setPlayers(updatedPlayers);
    } else {
      const updatedHost = { ...host };
      updatedHost.hand.push(card);
      updatedHost.score += calculateCardValue(card);
      setHost(updatedHost);
    }
    setDeck([...deck]);
  };

  const passTurn = () => {
    if (currentPlayerIndex >= players.length) {
      setIfCheckingWinner(true);
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  const calculateCardValue = (card) => {
    if (["jack", "queen", "king"].includes(card.rank)) return 10;
    if (card.rank === "ace") return 11;
    return parseInt(card.rank);
  };

  const checkGame = () => {
    setIfCheckingWinner(true);

    // Validate if the score is valid (<= 21)
    const validScores = (score) => score <= 21;

    // Map players to their results, with the score set to 0 if invalid
    const playerResults = players.map((player) => ({
      name: player.name,
      score: validScores(player.score) ? player.score : 0,
    }));

    // Validate host score
    const hostScore = validScores(host.score) ? host.score : 0;

    // Combine player results and host result
    const allResults = [
      ...playerResults,
      { name: host.name, score: hostScore },
    ];

    console.log(allResults);

    // Determine if the host has exploded (score > 21)
    const hostExploded = hostScore === 0;

    let winners = [];

    if (hostExploded) {
      // If the host exploded, all players who did not explode are winners
      winners = playerResults.filter((player) => player.score > 0);
    } else {
      // If the host didn't explode, find the highest score among players who didn't explode
      const highestScore = Math.max(
        ...allResults
          .filter((result) => result.score > 0)
          .map((result) => result.score)
      );

      winners = allResults.filter(
        (result) => result.score === highestScore && result.score > 0
      );
    }

    // Alert the winners
    if (winners.length > 0) {
      const winnerNames = winners.map((winner) => winner.name).join(", ");
      alert(`Winner(s): ${winnerNames}`);
    } else {
      alert("No winners!");
    }

    return winners;
  };

  React.useEffect(() => {
    resetGame();
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('./gameTable.jpg')", // Path from the
        backgroundSize: "cover", // Ensures the image covers the entire div
        backgroundPosition: "center", // Centers the image
        height: "100vh", // Ensures the div takes up the full viewport height (optional)
        width: "100vw", // Ensures the div takes up the full width (optional)
      }}
      className="app flex flex-col justify-between pb-3"
    >
      <h1 className="text-3xl font-bold   text-white">Black Jack</h1>
      <div className="flex flex-row justify-center text-white">
        <Host
          ifCheckingWinner={ifCheckingWinner}
          host={host}
          drawCard={drawCard}
          isCurrentPlayer={currentPlayerIndex === players.length}
          checkGame={checkGame}
        />
      </div>
      <div className="flex justify-between text-white">
        {players.map((player, index) => (
          <Player
            ifCheckingWinner={ifCheckingWinner}
            key={player.id}
            player={player}
            isCurrentPlayer={currentPlayerIndex === index}
            drawCard={drawCard}
            passTurn={passTurn}
          />
        ))}
      </div>
      <div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default App;
