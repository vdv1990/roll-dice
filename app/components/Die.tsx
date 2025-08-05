
import React from 'react';

interface DieProps {
  value: string | number;
  isFrozen?: boolean;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
}

// This component represents a single die
const Die: React.FC<DieProps> = ({ 
  value, 
  isFrozen = false, 
  onClick, 
  onDragStart, 
  onDragOver, 
  onDrop, 
  onDragEnd, 
  isDragging = false, 
  isDragOver = false 
}) => (
  <div
    className={`w-20 h-20 flex justify-center items-center text-5xl rounded-2xl cursor-pointer transition-all duration-300 shadow-md hover:scale-110 hover:shadow-lg
      ${isFrozen 
        ? 'bg-blue-100 ring-2 ring-blue-500 scale-105' 
        : 'bg-white'
      }
      ${isDragging ? 'opacity-50 scale-110 shadow-2xl rotate-3' : ''}
      ${isDragOver ? 'border-2 border-dashed border-blue-500 bg-blue-50' : ''}
    `}
    onClick={onClick}
    draggable="true"
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onDragEnd={onDragEnd}
  >
    {!isDragOver && value}
  </div>
);

export default Die;
