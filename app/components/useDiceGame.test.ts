import { renderHook, act } from '@testing-library/react';
import { useDiceGame } from './useDiceGame';

// Mock timers for rollDice animation
jest.useFakeTimers();

describe('useDiceGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useDiceGame());

    expect(result.current.numDice).toBe(5);
    expect(result.current.dice.length).toBe(5);
    expect(result.current.frozenIds.size).toBe(0);
    expect(result.current.currentRoll).toBe(0);
    expect(result.current.maxRolls).toBe(Infinity);
    expect(result.current.isRolling).toBe(false);
    expect(result.current.draggedId).toBeNull();
    expect(result.current.dragOverId).toBeNull();
    expect(result.current.score).toBe(result.current.dice.reduce((sum, d) => sum + d.value + 1, 0));
  });

  it('starts a new game with correct settings', () => {
    const { result } = renderHook(() => useDiceGame());

    act(() => {
      result.current.setLimitEnabled(true);
      result.current.setMaxRollsSelection('3');
    });

    expect(result.current.maxRolls).toBe(3);
    expect(result.current.currentRoll).toBe(0);
    expect(result.current.frozenIds.size).toBe(0);
  });

  it('handles rolling dice', () => {
    const { result } = renderHook(() => useDiceGame());
    const initialDice = [...result.current.dice];

    act(() => {
      result.current.rollDice();
    });

    // During rolling
    expect(result.current.isRolling).toBe(true);

    // After rolling animation
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.isRolling).toBe(false);
    expect(result.current.currentRoll).toBe(1);
    expect(result.current.dice).not.toEqual(initialDice);
  });

  it('respects roll limit', () => {
    const { result } = renderHook(() => useDiceGame());

    act(() => {
      result.current.setLimitEnabled(true);
      result.current.setMaxRollsSelection('3');
    });

    // Roll three times
    act(() => {
      result.current.rollDice();
      jest.advanceTimersByTime(1000);
      result.current.rollDice();
      jest.advanceTimersByTime(1000);
      result.current.rollDice();
      jest.advanceTimersByTime(1000);
    });

    const rollCount = result.current.currentRoll;

    // Try to roll again
    act(() => {
      result.current.rollDice();
      jest.advanceTimersByTime(1000);
    });

    // Roll count should not increase
    expect(result.current.currentRoll).toBe(rollCount);
  });

  it('handles freezing dice', () => {
    const { result } = renderHook(() => useDiceGame());

    // First roll
    act(() => {
      result.current.rollDice();
      jest.advanceTimersByTime(1000);
    });

    // Freeze first die
    act(() => {
      result.current.toggleFreeze(0);
    });

    expect(result.current.frozenIds.has(0)).toBe(true);

    // Unfreeze first die
    act(() => {
      result.current.toggleFreeze(0);
    });

    expect(result.current.frozenIds.has(0)).toBe(false);
  });

  it('prevents freezing during roll animation', () => {
    const { result } = renderHook(() => useDiceGame());

    act(() => {
      result.current.rollDice();
    });

    // Try to freeze during animation
    act(() => {
      result.current.toggleFreeze(0);
    });

    expect(result.current.frozenIds.has(0)).toBe(false);
  });

  it('handles drag and drop operations', () => {
    const { result } = renderHook(() => useDiceGame());

    // Start drag
    act(() => {
      result.current.handleDragStart(0);
    });
    expect(result.current.draggedId).toBe(0);

    // Enter another die
    act(() => {
      result.current.handleDragEnter(1);
    });
    expect(result.current.dragOverId).toBe(1);

    // Drop on target
    const initialDice = [...result.current.dice];
    act(() => {
      result.current.handleDrop(1);
    });

    // Verify dice order changed
    expect(result.current.dice).not.toEqual(initialDice);
    expect(result.current.draggedId).toBeNull();
    expect(result.current.dragOverId).toBeNull();
  });

  it('calculates score correctly', () => {
    const { result } = renderHook(() => useDiceGame());
    
    // Mock dice values
    const mockDice = [
      { id: 0, value: 3 }, // 4
      { id: 1, value: 2 }, // 3
      { id: 2, value: 1 }, // 2
      { id: 3, value: 5 }, // 6
      { id: 4, value: 4 }, // 5
    ];

    // Trigger a roll to update score
    act(() => {
      result.current.setDice(mockDice);
    });

    // Start a new game to recalculate score
    act(() => {
      result.current.startNewGame();
    });

    expect(result.current.score).toBe(20); // Sum of (value + 1) for each die
  });

  it('handles custom roll limit', () => {
    const { result } = renderHook(() => useDiceGame());

    act(() => {
      result.current.setLimitEnabled(true);
      result.current.setMaxRollsSelection('other');
      result.current.setCustomMaxRolls(5);
    });

    expect(result.current.maxRolls).toBe(5);
  });

  it('preserves frozen dice during rolls', () => {
    const { result } = renderHook(() => useDiceGame());

    // First roll
    act(() => {
      result.current.rollDice();
      jest.advanceTimersByTime(1000);
    });

    // Freeze first die and store its value
    const frozenValue = result.current.dice[0].value;
    act(() => {
      result.current.toggleFreeze(0);
    });

    // Second roll
    act(() => {
      result.current.rollDice();
      jest.advanceTimersByTime(1000);
    });

    // Frozen die should maintain its value
    expect(result.current.dice[0].value).toBe(frozenValue);
  });
});
