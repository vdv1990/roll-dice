
import { useState, useEffect } from 'react';

interface Die {
  id: number;
  value: number;
}

interface DragEvent {
  preventDefault: () => void;
}

export const useDiceGame = () => {
  const [numDice, setNumDice] = useState(5);
  const [dice, setDice] = useState<Die[]>([]); 
  const [frozenIds, setFrozenIds] = useState<Set<number>>(new Set());
  const [currentRoll, setCurrentRoll] = useState(0);
  const [maxRolls, setMaxRolls] = useState(Infinity);
  const [isRolling, setIsRolling] = useState(false);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('Default');
  
  // Advanced Options State
  const [showOptions, setShowOptions] = useState(false);
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [maxRollsSelection, setMaxRollsSelection] = useState('3');
  const [customMaxRolls, setCustomMaxRolls] = useState(10);

  const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  
  const themes = {
    Default: 'from-indigo-500 to-purple-600',
    Ocean: 'from-cyan-500 to-blue-500',
    Sunset: 'from-red-500 to-yellow-500',
  };

  // --- Drag and Drop Logic ---
  const handleDragStart = (id: number) => setDraggedId(id);
  const handleDragOver = (e: DragEvent) => e.preventDefault();
  const handleDragEnter = (id: number) => { if (draggedId !== id) setDragOverId(id); };
  const handleDragEnd = () => { setDraggedId(null); setDragOverId(null); };
  const handleDrop = (targetId: number) => {
    if (draggedId === null || draggedId === targetId) { handleDragEnd(); return; }
    const draggedIndex = dice.findIndex(d => d.id === draggedId);
    const targetIndex = dice.findIndex(d => d.id === targetId);
    const newDice = [...dice];
    const [draggedItem] = newDice.splice(draggedIndex, 1);
    newDice.splice(targetIndex, 0, draggedItem);
    setDice(newDice);
    handleDragEnd();
  };

  // --- Game Logic Functions ---
  const calculateScore = (currentDice: Die[]) => {
    const total = currentDice.reduce((sum: number, d: Die) => sum + d.value + 1, 0);
    setScore(total);
  };

  const startNewGame = () => {
    let newMaxRolls = Infinity;
    if (limitEnabled) {
      newMaxRolls = maxRollsSelection === 'other' ? Number(customMaxRolls) || 10 : Number(maxRollsSelection);
    }
    setMaxRolls(newMaxRolls);
    
    const initialDice = Array.from({ length: numDice }, (_, i) => ({ id: i, value: Math.floor(Math.random() * 6) }));
    setDice(initialDice);
    setFrozenIds(new Set());
    setCurrentRoll(0);
    setIsRolling(false);
    calculateScore(initialDice);
  };

  const rollDice = () => {
    if (currentRoll >= maxRolls) return;

    setIsRolling(true);
    setCurrentRoll(prev => prev + 1);

    let tempDice = [...dice];
    const rollingInterval = setInterval(() => {
      tempDice = tempDice.map(d => frozenIds.has(d.id) ? d : { ...d, value: Math.floor(Math.random() * 6) });
      setDice(tempDice);
    }, 80);

    setTimeout(() => {
      clearInterval(rollingInterval);
      const finalDice = dice.map(d => frozenIds.has(d.id) ? d : { ...d, value: Math.floor(Math.random() * 6) });
      setDice(finalDice);
      calculateScore(finalDice);
      setIsRolling(false);
    }, 1000);
  };

  const toggleFreeze = (id: number) => {
    // Freezing is only allowed after the first roll and when not rolling.
    if (isRolling || currentRoll === 0) return;
    setFrozenIds(prevIds => {
      const newIds = new Set(prevIds);
      newIds.has(id) ? newIds.delete(id) : newIds.add(id);
      return newIds;
    });
  };

  // --- Effects ---
  useEffect(() => {
    startNewGame();
  }, [numDice, limitEnabled, maxRollsSelection, customMaxRolls, calculateScore]);

  return {
    numDice, setNumDice,
    dice, setDice,
    frozenIds, setFrozenIds,
    currentRoll, setCurrentRoll,
    maxRolls, setMaxRolls,
    isRolling, setIsRolling,
    draggedId, setDraggedId,
    dragOverId, setDragOverId,
    score, setScore,
    theme, setTheme,
    showOptions, setShowOptions,
    limitEnabled, setLimitEnabled,
    maxRollsSelection, setMaxRollsSelection,
    customMaxRolls, setCustomMaxRolls,
    diceFaces,
    themes,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragEnd,
    handleDrop,
    startNewGame,
    rollDice,
    toggleFreeze
  };
};
