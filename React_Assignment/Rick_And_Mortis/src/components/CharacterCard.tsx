import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  theme: 'light' | 'dark';
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, theme }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  
  return (
    <Link 
      to={`/character/${character.id}`} 
      target="_blank"
      className={`block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="relative">
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-full h-64 object-cover"
        />
        <div className={`absolute top-4 right-4 rounded-full px-3 py-1 text-white text-xs font-bold ${getStatusColor(character.status)}`}>
          {character.status}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold truncate">{character.name}</h2>
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          {character.species}
        </p>
      </div>
    </Link>
  );
};

export default CharacterCard;