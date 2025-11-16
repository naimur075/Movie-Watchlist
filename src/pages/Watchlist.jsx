import React from "react";
import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist() {
  const { movies, remove } = useWatchlist();

  if (!movies.length) {
    return (
      <p className="p-4 text-gray-600">
        Your watchlist is empty. Add some movies!
      </p>
    );
  }

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((m) => (
        <div
          key={m.id}
          className="p-3 border rounded shadow hover:shadow-lg transition"
        >
          <img
            src={
              m.poster_path
                ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                : ""
            }
            className="w-full rounded"
            alt={m.title}
          />

          <h3 className="font-bold mt-2">{m.title}</h3>
          <p className="text-sm text-gray-500">
            {m.release_date?.slice(0, 4)}
          </p>

          <button
            onClick={() => remove(m.id)}
            className="mt-3 px-3 py-1 bg-red-600 text-white rounded w-full"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
