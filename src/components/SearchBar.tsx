import { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const cacheKey = 'mangaSearchCache';
const cacheExpiry = 1000 * 60 * 15; // 15 minutos

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [cachedResults, setCachedResults] = useState<Map<string, { data: any; timestamp: number }>>(
    new Map(JSON.parse(localStorage.getItem(cacheKey) || '[]'))
  );

  useEffect(() => {
    // Check if the query is cached and not expired
    const cache = cachedResults.get(query);
    if (cache && Date.now() - cache.timestamp < cacheExpiry) {
      onSearch(cache.data);
    } else {
      // Clear cache if expired
      if (cache && Date.now() - cache.timestamp >= cacheExpiry) {
        cachedResults.delete(query);
        setCachedResults(new Map(cachedResults));
        localStorage.setItem(cacheKey, JSON.stringify(Array.from(cachedResults.entries())));
      }
    }
  }, [query, cachedResults, onSearch]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return;

    try {
      // Fetch the search results
      const response = await axios.get('/api/search', { params: { title: query } });
      const data = response.data;
      
      // Update cache
      const updatedCache = new Map(cachedResults);
      updatedCache.set(query, { data, timestamp: Date.now() });
      setCachedResults(updatedCache);
      localStorage.setItem(cacheKey, JSON.stringify(Array.from(updatedCache.entries())));

      onSearch(data);
    } catch (error) {
      console.error('Error fetching manga data:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border rounded"
        placeholder="Buscar mangas..."
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
