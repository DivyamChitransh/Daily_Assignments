import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacterById } from '../services/api';
import { Character } from '../types';
import LiveClock from '../components/LiveClock';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, HdmiPort as Portal } from 'lucide-react';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [episodeCount, setEpisodeCount] = useState<number>(0);

  useEffect(() => {
    if (id) {
      loadCharacter(id);
    }
  }, [id]);

  const loadCharacter = async (characterId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacterById(characterId);
      setCharacter(data);
      setEpisodeCount(data.episode.length);
    } catch (err) {
      setError('Failed to load character. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return theme === 'dark' ? 'text-green-400' : 'text-green-600';
      case 'Dead':
        return theme === 'dark' ? 'text-red-400' : 'text-red-600';
      default:
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <header className={`py-6 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-md`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Portal size={32} className="text-green-500 mr-3" />
              <h1 className="text-3xl font-bold">Rick and Morty Wiki</h1>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className={`inline-flex items-center mb-6 px-4 py-2 rounded-md ${
            theme === 'dark' 
              ? 'bg-purple-800 text-white hover:bg-purple-700' 
              : 'bg-purple-600 text-white hover:bg-purple-500'
          } transition-colors`}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Gallery
        </Link>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSpinner theme={theme} />
        ) : character && (
          <div className={`rounded-lg overflow-hidden shadow-xl ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="relative">
                  <img 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-0 inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <h2 className="text-3xl font-bold mb-4">{character.name}</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Character Info</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status: </span>
                        <span className={`font-medium ${getStatusColor(character.status)}`}>{character.status}</span>
                      </div>
                      
                      <div>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Species: </span>
                        <span>{character.species}</span>
                      </div>
                      
                      {character.type && (
                        <div>
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Type: </span>
                          <span>{character.type}</span>
                        </div>
                      )}
                      
                      <div>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Gender: </span>
                        <span>{character.gender}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Location Info</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Origin: </span>
                        <span>{character.origin.name}</span>
                      </div>
                      
                      <div>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Current Location: </span>
                        <span>{character.location.name}</span>
                      </div>
                      
                      <div>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Episodes: </span>
                        <span>{episodeCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className={`py-4 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-inner`}>
        <div className="container mx-auto px-4">
          <LiveClock />
        </div>
      </footer>
    </div>
  );
};

export default CharacterDetail;