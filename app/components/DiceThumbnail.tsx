import React from 'react';

export default function DiceThumbnail() {
  // This is a simple SVG representation of dice
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="40" width="120" height="120" rx="10" fill="#4F46E5" />
      <circle cx="70" cy="70" r="10" fill="white" />
      <circle cx="130" cy="70" r="10" fill="white" />
      <circle cx="70" cy="130" r="10" fill="white" />
      <circle cx="130" cy="130" r="10" fill="white" />
      <circle cx="100" cy="100" r="10" fill="white" />
    </svg>
  );
}
