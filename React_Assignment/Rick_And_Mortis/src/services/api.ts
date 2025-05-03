import { ApiResponse, Character } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/character/?page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

export const fetchRandomCharacter = async (): Promise<Character> => {
  try {
    // First, get the total count of characters
    const countResponse = await fetch(`${BASE_URL}/character`);
    const data = await countResponse.json();
    const count = data.info.count;
    
    // Generate a random ID between 1 and count
    const randomId = Math.floor(Math.random() * count) + 1;
    
    // Fetch the random character
    return await fetchCharacterById(randomId.toString());
  } catch (error) {
    console.error('Error fetching random character:', error);
    throw error;
  }
};