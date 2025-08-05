"use client";

import { useState } from "react";

export default function Home() {
  const [diceCount, setDiceCount] = useState(1);
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const rollDice = () => {
    const newDiceValues = Array.from({ length: diceCount }, () =>
      Math.floor(Math.random() * 6) + 1
    );
    setDiceValues(newDiceValues);
    setTotal(newDiceValues.reduce((sum, val) => sum + val, 0));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Dice Roller</h1>

      <div className="flex items-center mb-4">
        <label htmlFor="dice-count" className="mr-2">
          Number of Dice:
        </label>
        <input
          id="dice-count"
          type="number"
          min="1"
          max="5"
          value={diceCount}
          onChange={(e) => setDiceCount(Number(e.target.value))}
          className="w-16 p-2 border rounded"
        />
      </div>

      <button
        onClick={rollDice}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Roll Dice
      </button>

      {diceValues.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="flex gap-4 mb-4">
            {diceValues.map((value, i) => (
              <div
                key={i}
                className="w-24 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl font-bold"
              >
                {value}
              </div>
            ))}
          </div>
          <p className="text-2xl">Total: {total}</p>
        </div>
      )}
    </main>
  );
}