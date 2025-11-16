import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();
export const useWatchlist = () => useContext(WatchlistContext);

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  // Auto-load watchlist when user logs in
  useEffect(() => {
    if (!user) {
      setMovies([]);
      return;
    }

    const ref = collection(db, "users", user.uid, "watchlist");

    const unsubscribe = onSnapshot(ref, (snap) => {
      const list = snap.docs.map((d) => d.data());
      setMovies(list);
    });

    return unsubscribe;
  }, [user]);

  const add = async (movie) => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "watchlist", String(movie.id));

    await setDoc(ref, {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      createdAt: new Date(),
    });
  };

  const remove = async (id) => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "watchlist", String(id));
    await deleteDoc(ref);
  };

  return (
    <WatchlistContext.Provider
      value={{
        movies,
        add,
        remove,
        isInWatchlist: (id) => movies.some((m) => m.id === id),
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
