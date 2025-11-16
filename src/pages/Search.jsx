import React, { useState } from 'react'
import { searchMovies } from '../api/tmdb'
import MovieCard from '../components/MovieCard'

export default function Search() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTyping = async (text) => {
    setQuery(text)
    if (text.length < 2) {
      setSuggestions([])
      return
    }

    try {
      const results = await searchMovies(text)
      setSuggestions(results.slice(0, 5))
    } catch {}
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const results = await searchMovies(query)

      const [titlePart, yearPart] = query.split(" ")
      let filtered = results

      if (!isNaN(yearPart)) {
        filtered = results.filter(
          m => m.release_date?.startsWith(yearPart)
        )
      }

      setMovies(filtered)
      setSuggestions([])
    } catch (err) {
      setError('Failed to fetch movies. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-32 relative">

      <div className="w-full max-w-lg flex flex-col items-center justify-center gap-3 relative">

        <input
          value={query}
          onChange={(e) => handleTyping(e.target.value)}
          className="border p-3 w-full rounded text-lg shadow focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition-all bg-black/30 backdrop-blur-md text-white"
          placeholder="Search movies..."
        />

        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white 
          rounded text-lg shadow transition-all"
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <div className="bg-black/60 text-white absolute top-full mt-1 w-full border rounded shadow-lg z-40 backdrop-blur">
            {suggestions.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setQuery(s.title)
                  setSuggestions([])
                  handleSearch()
                }}
                className="p-2 hover:bg-white/20 cursor-pointer"
              >
                {s.title} ({s.release_date?.slice(0,4)})
              </div>
            ))}
          </div>
        )}

      </div>

      {loading && <p className='mt-6 text-white'>Loading...</p>}
      {error && <p className='mt-6 text-red-400'>{error}</p>}

      {!loading && movies.length === 0 && query && (
        <p className='mt-6 text-gray-300'>No movies/series found.</p>
      )}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} m={movie} />
        ))}
      </div>
    </div>
  )
}
