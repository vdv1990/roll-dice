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
    // Mock Math.random() to control dice values
    const mockMathRandom = jest.spyOn(Math, 'random').mockReturnValueOnce(0.5) // Die 1: 3 (0.5 * 6 = 3)
                                                .mockReturnValueOnce(0.3) // Die 2: 1 (0.3 * 6 = 1)
                                                .mockReturnValueOnce(0.1) // Die 3: 0 (0.1 * 6 = 0)
                                                .mockReturnValueOnce(0.9) // Die 4: 5 (0.9 * 6 = 5)
                                                .mockReturnValueOnce(0.7); // Die 5: 4 (0.7 * 6 = 4)

    const { result } = renderHook(() => useDiceGame());
    
    // The initial dice values are set in startNewGame, which is called on mount
    // The mocked Math.random will ensure these are predictable
    expect(result.current.dice[0].value).toBe(3);
    expect(result.current.dice[1].value).toBe(1);
    expect(result.current.dice[2].value).toBe(0);
    expect(result.current.dice[3].value).toBe(5);
    expect(result.current.dice[4].value).toBe(4);

    expect(result.current.score).toBe(18); // Sum of (value + 1) for each die

    mockMathRandom.mockRestore();
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
