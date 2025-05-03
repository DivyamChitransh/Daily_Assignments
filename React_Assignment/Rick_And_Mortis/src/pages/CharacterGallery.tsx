import React, { useState, useEffect } from 'react';
import { fetchCharacters, fetchRandomCharacter } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import LiveClock from '../components/LiveClock';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import { Character } from '../types';
import { HdmiPort as Portal } from 'lucide-react';

const CharacterGallery: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    loadCharacters(currentPage);
  }, [currentPage]);

  const loadCharacters = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacters(page);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setError('Failed to load characters. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomCharacter = async () => {
    try {
      const randomCharacter = await fetchRandomCharacter();
      window.open(`/character/${randomCharacter.id}`, '_blank');
    } catch (err) {
      setError('Failed to load random character. Please try again.');
      console.error(err);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRandomCharacter}
                className={`px-4 py-2 rounded-md transition-colors ${
                  theme === 'dark' 
                    ? 'bg-green-600 text-white hover:bg-green-500' 
                    : 'bg-green-500 text-white hover:bg-green-400'
                }`}
              >
                Random Character
              </button>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSpinner theme={theme} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <CharacterCard 
                  key={character.id} 
                  character={character} 
                  theme={theme}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              theme={theme}
            />
          </>
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

export default CharacterGallery;