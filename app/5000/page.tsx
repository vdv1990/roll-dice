import React from 'react';

export default function FiveThousandPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 p-8">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h1 className="text-5xl font-bold mb-4">5000</h1>
        <p className="text-xl mb-8">Coming Soon!</p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <p className="text-lg mb-4">
            A classic dice game where players roll six dice and score points based on different combinations.
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li>• Roll up to six dice</li>
            <li>• Score combinations like three-of-a-kind</li>
            <li>• First player to reach 5000 points wins</li>
            <li>• Strategic decisions on which dice to keep</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
