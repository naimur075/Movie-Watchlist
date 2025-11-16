import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { useAuth } from '../context/AuthContext'
import Popup from './Popup'
import { motion } from 'framer-motion'

export default function MovieCard({ m }) {
  const { add } = useWatchlist()
  const { user } = useAuth()
  const [showPopup, setShowPopup] = useState(false)

  const handleAdd = () => {
    if (!user) {
      setShowPopup(true)
      return
    }
    add(m)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className='p-3 border rounded-xl shadow-xl transition-all duration-300 
      transform hover:scale-105 hover:shadow-2xl backdrop-blur-xl bg-white/10'
    >
      {showPopup && (
        <Popup
          message="You must log in to manage your watchlist."
          onClose={() => setShowPopup(false)}
        />
      )}

      <img
        src={m.poster_path ? `https://image.tmdb.org/t/p/w300${m.poster_path}` : ''}
        className='w-full rounded-lg'
        alt={m.title}
      />

      <h3 className='font-bold mt-2 text-white'>{m.title}</h3>
      <p className='text-sm text-gray-300'>{m.release_date?.slice(0, 4)}</p>

      <div className='flex justify-between mt-3'>
        <Link
          to={`/movie/${m.id}`}
          className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 
          active:scale-95 transition-all'
        >
          Details
        </Link>

        <button
          onClick={handleAdd}
          className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded 
          active:scale-95 transition-all'
        >
          + Watchlist
        </button>
      </div>
    </motion.div>
  )
}
