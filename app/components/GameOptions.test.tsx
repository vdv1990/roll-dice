import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameOptions from './GameOptions';

// Mock the child components
jest.mock('./StyledSelect');
jest.mock('./ToggleSwitch');

describe('GameOptions', () => {
  const defaultProps = {
    showOptions: false,
    setShowOptions: jest.fn(),
    limitEnabled: false,
    setLimitEnabled: jest.fn(),
    maxRollsSelection: '3',
    setMaxRollsSelection: jest.fn(),
    customMaxRolls: 5,
    setCustomMaxRolls: jest.fn(),
    themes: {
      'Light': 'light-theme',
      'Dark': 'dark-theme'
    },
    theme: 'Light',
    setTheme: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders options button with correct arrow', () => {
    render(<GameOptions {...defaultProps} />);
    const optionsButton = screen.getByText(/Options/);
    expect(optionsButton).toBeInTheDocument();
    expect(optionsButton).toHaveTextContent('Options ▾');
  });

  it('shows expanded options when showOptions is true', () => {
    render(<GameOptions {...defaultProps} showOptions={true} />);
    const optionsButton = screen.getByText(/Options/);
    expect(optionsButton).toHaveTextContent('Options ▴');
    expect(screen.getByText('Enable Roll Limit')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('toggles options visibility when clicking the button', () => {
    render(<GameOptions {...defaultProps} />);
    const optionsButton = screen.getByText(/Options/);
    
    fireEvent.click(optionsButton);
    expect(defaultProps.setShowOptions).toHaveBeenCalledWith(true);
  });

  it('shows max rolls selection when limit is enabled', () => {
    render(<GameOptions {...defaultProps} showOptions={true} limitEnabled={true} />);
    expect(screen.getByText('Max Rolls')).toBeInTheDocument();
  });

  it('shows custom max rolls input when "other" is selected', () => {
    render(
      <GameOptions 
        {...defaultProps} 
        showOptions={true} 
        limitEnabled={true}
        maxRollsSelection="other"
      />
    );
    expect(screen.getByLabelText('Custom Max:')).toBeInTheDocument();
  });

  it('updates custom max rolls when input changes', () => {
    render(
      <GameOptions 
        {...defaultProps} 
        showOptions={true} 
        limitEnabled={true}
        maxRollsSelection="other"
      />
    );
    const input = screen.getByLabelText('Custom Max:');
    fireEvent.change(input, { target: { value: '10' } });
    expect(defaultProps.setCustomMaxRolls).toHaveBeenCalledWith(10);
  });

  it('renders theme selector with correct options', () => {
    render(<GameOptions {...defaultProps} showOptions={true} />);
    const themeLabel = screen.getByText('Theme');
    expect(themeLabel).toBeInTheDocument();
    
    // Since StyledSelect is mocked, we can't test the actual select options
    // Those should be tested in StyledSelect's own test file
  });

  it('toggles limit when clicking the toggle switch', () => {
    render(<GameOptions {...defaultProps} showOptions={true} />);
    const toggle = screen.getByTestId('toggle-switch');
    fireEvent.click(toggle);
    expect(defaultProps.setLimitEnabled).toHaveBeenCalledWith(true);
  });
});
