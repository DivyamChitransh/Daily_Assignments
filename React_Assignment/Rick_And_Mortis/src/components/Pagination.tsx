import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme: 'light' | 'dark';
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  theme
}) => {
  const buttonClass = `
    flex items-center justify-center px-4 py-2 rounded-md
    ${theme === 'dark' 
      ? 'bg-purple-800 text-white hover:bg-purple-700 disabled:bg-gray-700' 
      : 'bg-purple-600 text-white hover:bg-purple-500 disabled:bg-gray-300'}
    transition-colors duration-200 disabled:cursor-not-allowed
  `;
  
  return (
    <div className="flex items-center justify-between mt-6">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass}
      >
        <ChevronLeft size={18} className="mr-1" />
        Previous
      </button>
      
      <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
        Page {currentPage} of {totalPages}
      </span>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClass}
      >
        Next
        <ChevronRight size={18} className="ml-1" />
      </button>
    </div>
  );
};

export default Pagination;