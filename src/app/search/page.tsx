'use client'

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

// Define the type for a repository
interface Repository {
  id: number;
  name: string;
  html_url: string;
}

const fetchRepos = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`/api/repos?username=${username}`);
  if (!response.ok) {
    // Check if the response status is 404 (Not Found)
    if (response.status === 404) {
      throw new Error('User not found. Please check the username and try again.');
    }
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};

export default function SearchPage() {
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Local state for the search term

  const { data: repos = [], error, isLoading } = useQuery({
    queryKey: ['repos', searchTerm], // Query key
    queryFn: () => fetchRepos(searchTerm), // Fetch function
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
  });

  const handleSearch = () => {
    if (username) {
      setSearchTerm(username); // Set the search term to trigger the query
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl mb-4">Search for GitHub Repositories</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border border-gray-300 rounded p-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded p-2"
        >
          Search
        </button>
      </div>
      {isLoading && <p className="text-blue-500 mt-2">Loading...</p>} {/* Loading state */}
      {error && <p className="text-red-500 mt-2">{error.message}</p>} {/* Display error message */}
      <Link href="/">
        <button className="mt-4 bg-gray-300 text-black rounded p-2">
          Back to Home
        </button>
      </Link>
      {repos.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl">Repositories:</h2>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id} className="mt-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 