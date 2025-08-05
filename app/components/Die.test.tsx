
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Die from './Die';

describe('Die', () => {
  const defaultProps = {
    value: 6,
    isFrozen: false,
    onClick: jest.fn(),
    onDragStart: jest.fn(),
    onDragOver: jest.fn(),
    onDrop: jest.fn(),
    onDragEnd: jest.fn(),
    isDragging: false,
    isDragOver: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the value', () => {
    render(<Die {...defaultProps} value="⚀" />);
    expect(screen.getByText("⚀")).toBeInTheDocument();
  });

  it('applies the frozen styles when isFrozen is true', () => {
    render(<Die {...defaultProps} value="⚀" isFrozen={true} />);
    const dieElement = screen.getByRole('button');
    expect(dieElement).toHaveClass('bg-blue-100', 'ring-2', 'ring-blue-500', 'scale-105');
  });

  it('does not apply the frozen styles when isFrozen is false', () => {
    render(<Die {...defaultProps} value="⚀" isFrozen={false} />);
    const dieElement = screen.getByRole('button');
    expect(dieElement).not.toHaveClass('bg-blue-100');
    expect(dieElement).not.toHaveClass('ring-2');
    expect(dieElement).not.toHaveClass('ring-blue-500');
    expect(dieElement).not.toHaveClass('scale-105');
  });

  it('handles click events', () => {
    render(<Die {...defaultProps} value="⚀" />);
    const dieElement = screen.getByText('⚀');
    fireEvent.click(dieElement);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('shows dragging state', () => {
    render(<Die {...defaultProps} value="⚀" isDragging={true} />);
    const dieElement = screen.getByRole('button');
    expect(dieElement).toHaveClass('opacity-50', 'scale-110', 'shadow-2xl', 'rotate-3');
  });

  it('shows drag over state', () => {
    render(<Die {...defaultProps} value="⚀" isDragOver={true} />);
    const dieElement = screen.getByRole('button');
    expect(dieElement).toHaveClass('border-2', 'border-dashed', 'border-blue-500', 'bg-blue-50');
    expect(dieElement).toHaveTextContent(''); // value should not be shown when isDragOver is true
  });

  it('handles drag and drop events', () => {
    render(<Die {...defaultProps} value="⚀" />);
    const dieElement = screen.getByText('⚀');

    fireEvent.dragStart(dieElement);
    expect(defaultProps.onDragStart).toHaveBeenCalledTimes(1);

    fireEvent.dragOver(dieElement);
    expect(defaultProps.onDragOver).toHaveBeenCalledTimes(1);

    fireEvent.drop(dieElement);
    expect(defaultProps.onDrop).toHaveBeenCalledTimes(1);

    fireEvent.dragEnd(dieElement);
    expect(defaultProps.onDragEnd).toHaveBeenCalledTimes(1);
  });

  it('renders with numeric value', () => {
    render(<Die {...defaultProps} value={6} />);
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('handles missing optional props', () => {
    const minimalProps = {
      value: '⚀'
    };
    render(<Die {...minimalProps} />);
    const dieElement = screen.getByRole('button');
    
    expect(dieElement).toHaveClass('bg-white');
    expect(dieElement).not.toHaveClass('opacity-50');
    expect(dieElement).not.toHaveClass('border-2');
  });

  it('combines multiple states correctly', () => {
    render(
      <Die 
        {...defaultProps} 
        value="⚀" 
        isFrozen={true} 
        isDragging={true} 
      />
    );
    const dieElement = screen.getByRole('button');
    
    expect(dieElement).toHaveClass('bg-blue-100', 'ring-2', 'ring-blue-500');
    expect(dieElement).toHaveClass('opacity-50', 'scale-110', 'shadow-2xl');
  });

  it('has correct base styles', () => {
    render(<Die {...defaultProps} value="⚀" />);
    const dieElement = screen.getByRole('button');
    
    expect(dieElement).toHaveClass(
      'w-20', 
      'h-20', 
      'flex', 
      'justify-center', 
      'items-center', 
      'text-5xl', 
      'rounded-2xl', 
      'cursor-pointer'
    );
  });
});
