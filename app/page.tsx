"use client";

import { useState, useMemo } from "react";

const MIN_DICE_COUNT = 1;
const MAX_DICE_COUNT = 10;
const DICE_SIDES = 6;

export default function Home() {
  const [diceCount, setDiceCount] = useState(MIN_DICE_COUNT);
  const [diceValues, setDiceValues] = useState<number[]>([]);

  // The total is derived from diceValues, so it doesn't need its own state.
  // useMemo will re-calculate the total only when diceValues changes.
  const total = useMemo(
    () => diceValues.reduce((sum, val) => sum + val, 0),
    [diceValues]
  );

  const rollDice = () => {
    const newDiceValues = Array.from(
      { length: diceCount },
      () => Math.floor(Math.random() * DICE_SIDES) + 1
    );
    setDiceValues(newDiceValues);
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
          min={MIN_DICE_COUNT}
          max={MAX_DICE_COUNT}
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
          <div
            className="flex flex-wrap justify-center gap-4 mb-4"
            role="group"
            aria-label="Dice values"
          >
            {diceValues.map((value, i) => (
              <div
                key={i}
                className="w-24 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl font-bold"
                aria-label={`Dice ${i + 1} shows ${value}`}
                role="img"
              >
                {value}
              </div>
            ))}
          </div>
          <p className="text-2xl" aria-live="polite">Total: {total}</p>
        </div>
      )}
    </main>
  );
}