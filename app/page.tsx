'use client';
import React from 'react';
import Die from './components/Die';
import StyledSelect from './components/StyledSelect';
import GameOptions from './components/GameOptions';
import { useDiceGame } from './components/useDiceGame';

export default function App() {
  const {
    numDice, setNumDice,
    dice,
    frozenIds,
    currentRoll,
    maxRolls,
    isRolling,
    draggedId,
    dragOverId,
    score,
    theme,
    themes,
    showOptions, setShowOptions,
    limitEnabled, setLimitEnabled,
    maxRollsSelection, setMaxRollsSelection,
    customMaxRolls, setCustomMaxRolls,
    diceFaces,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragEnd,
    handleDrop,
    startNewGame,
    rollDice,
    toggleFreeze,
    setTheme
  } = useDiceGame();

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />

      <div className={`min-h-screen flex items-center justify-center p-4 font-['Nunito',sans-serif] bg-gradient-to-br ${themes[theme]}`}>
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
          
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Roll the Dice</h1>
          
          <div className="text-lg text-gray-600 font-semibold mb-1 min-h-[28px]">
            {maxRolls === Infinity ? `Roll: ${currentRoll}` : `Roll: ${currentRoll} / ${maxRolls}`}
          </div>
          <div className="text-lg text-gray-600 font-semibold mb-6 min-h-[28px]">
            Total Score: {score}
          </div>

          <div className="mb-6 flex justify-center">
            <div className="flex items-center">
              <label className="text-gray-700 mr-3">Number of Dice:</label>
              <StyledSelect
                options={[1, 2, 3, 4, 5, 6].map(n => ({ value: String(n), label: String(n) }))}
                value={String(numDice)}
                onChange={(value) => setNumDice(Number(value))}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 min-h-[100px] mb-8" onDragOver={handleDragOver}>
            {dice.map((d) => (
              <div key={d.id} onDragEnter={() => handleDragEnter(d.id)} onDrop={() => handleDrop(d.id)}>
                  <Die 
                    value={diceFaces[d.value]} 
                    isFrozen={frozenIds.has(d.id)}
                    onClick={() => toggleFreeze(d.id)}
                    onDragStart={() => handleDragStart(d.id)}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedId === d.id}
                    isDragOver={dragOverId === d.id}
                  />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button 
              onClick={rollDice}
              disabled={isRolling || currentRoll >= maxRolls}
              className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              Roll the Dice
            </button>
            {limitEnabled && (
              <button 
                onClick={startNewGame}
                className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                New Game
              </button>
            )}
          </div>
          
          <GameOptions 
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            limitEnabled={limitEnabled}
            setLimitEnabled={setLimitEnabled}
            maxRollsSelection={maxRollsSelection}
            setMaxRollsSelection={setMaxRollsSelection}
            customMaxRolls={customMaxRolls}
            setCustomMaxRolls={setCustomMaxRolls}
            themes={themes}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </div>
    </>
  );
}