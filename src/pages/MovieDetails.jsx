import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import Popup from "../components/Popup";

export default function MovieDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const { add, remove, isInWatchlist } = useWatchlist();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    }
    fetchMovie();
  }, [id]);

  const handleWatchlist = () => {
    if (!user) {
      setShowPopup(true);
      return;
    }

    if (isInWatchlist(movie.id)) {
      remove(movie.id);
    } else {
      add(movie);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!movie) return <p className="p-4">Movie not found.</p>;

  return (
    <div className="p-4">
      {showPopup && (
        <Popup
          message="You must log in to manage your watchlist."
          onClose={() => setShowPopup(false)}
        />
      )}

      <button
        onClick={() => nav(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded"
      >
        ⬅ Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-64"
        />

        {/* Details */}
        <div className="flex-1 text-gray-200">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-md">
          {movie.title}
        </h1>

        {/* Genres */}
        <p className="text-gray-300">
        <span className="font-semibold text-blue-300">Genres:</span>{" "}
          {movie.genres.map((g) => g.name).join(", ")}
        </p>

        {/* Release Date */}
        <p className="text-gray-300 mt-1">
        <span className="font-semibold text-green-300">Release:</span>{" "}
          {movie.release_date}
        </p>

        {/* Rating */}
        <p className="text-gray-300 mt-1">
          <span className="font-semibold text-yellow-300">Rating:</span>{" "}
          <span className="text-yellow-400 font-bold">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        </p>

  {/* Tagline (if exists) */}
  {movie.tagline && (
    <p className="italic text-gray-400 mt-2 text-lg">
      “{movie.tagline}”
    </p>
  )}

  {/* Summary */}
  <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-300">
    Overview
  </h2>
  <p className="text-gray-200 leading-relaxed bg-white/5 p-3 rounded-lg backdrop-blur-md">
    {movie.overview}
  </p>

  {/* Reviews Section (if you fetched them) */}
  {movie.reviews && movie.reviews.length > 0 && (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3 text-purple-300">
        Reviews
      </h2>

      <div className="flex flex-col gap-4">
        {movie.reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 bg-white/10 rounded-lg backdrop-blur-md border border-white/10"
          >
            <p className="text-gray-100 leading-relaxed">
              {review.content}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              — <span className="text-gray-200 font-semibold">{review.author}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
}


