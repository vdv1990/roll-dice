import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToggleSwitch from './ToggleSwitch';

describe('ToggleSwitch', () => {
  it('renders with default props', () => {
    render(<ToggleSwitch isEnabled={false} onChange={() => {}} />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toBeChecked();
  });

  it('renders in enabled state', () => {
    render(<ToggleSwitch isEnabled={true} onChange={() => {}} />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<ToggleSwitch isEnabled={false} onChange={handleChange} />);
    const toggle = screen.getByRole('checkbox');
    
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled state', () => {
    const handleChange = jest.fn();
    render(<ToggleSwitch isEnabled={false} onChange={handleChange} disabled={true} />);
    const toggle = screen.getByRole('checkbox');
    
    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with custom label', () => {
    const customLabel = 'Custom Toggle';
    render(<ToggleSwitch isEnabled={false} onChange={() => {}} label={customLabel} />);
    const toggle = screen.getByLabelText(customLabel);
    expect(toggle).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<ToggleSwitch isEnabled={true} onChange={() => {}} label="Test Toggle" />);
    const toggle = screen.getByRole('checkbox');
    
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle.parentElement).toHaveAttribute('aria-label', 'Test Toggle');
  });
});
