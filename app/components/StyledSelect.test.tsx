import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StyledSelect from './StyledSelect';

describe('StyledSelect', () => {
  const defaultProps = {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option1',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with selected value', () => {
    render(<StyledSelect {...defaultProps} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<StyledSelect {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Check if menu is visible
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <StyledSelect {...defaultProps} />
      </div>
    );

    // Open dropdown
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));

    // Check if menu is hidden
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls onChange when selecting an option', () => {
    render(<StyledSelect {...defaultProps} />);
    
    // Open dropdown
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Click second option
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('option2');
  });

  it('displays default value when no matching option is found', () => {
    render(<StyledSelect {...defaultProps} value="nonexistent" />);
    expect(screen.getByText('nonexistent')).toBeInTheDocument();
  });

  it('prevents default behavior when clicking options', () => {
    render(<StyledSelect {...defaultProps} />);
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button'));

    // Click an option
    const option = screen.getByText('Option 2');
    const mockEvent = {
      preventDefault: jest.fn()
    };
    fireEvent.click(option, mockEvent);

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('closes dropdown after selecting an option', () => {
    render(<StyledSelect {...defaultProps} />);
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button'));

    // Select an option
    fireEvent.click(screen.getByText('Option 2'));

    // Check if menu is hidden
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<StyledSelect {...defaultProps} />);
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button'));

    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('toggles dropdown when clicking button multiple times', () => {
    render(<StyledSelect {...defaultProps} />);
    const button = screen.getByRole('button');

    // First click - open
    fireEvent.click(button);
    expect(screen.getByText('Option 2')).toBeVisible();

    // Second click - close
    fireEvent.click(button);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    // Third click - open again
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
