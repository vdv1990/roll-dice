import React from 'react';
import Link from 'next/link';

interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  route: string;
}

const games: Game[] = [
  {
    id: 'dice',
    title: 'Roll the Dice',
    description: 'A fun dice rolling game with customizable options and beautiful themes.',
    imageUrl: '/dice-thumbnail.png',
    route: '/'
  },
  {
    id: '5000',
    title: '5000',
    description: 'Classic dice game where players compete to reach 5000 points through strategic dice combinations.',
    imageUrl: '/5000-thumbnail.png',
    route: '/5000'
  }
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Our Games</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link href={game.route} key={game.id} className="block">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-105">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Add a fallback image or loading state */}
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
