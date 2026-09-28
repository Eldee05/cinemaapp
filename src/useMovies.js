import { useState, useEffect } from "react";
const KEY = "10decbf";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //callback?.();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong, try something else");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          /* const uniqueMovies = [
            ...new Map(
              data.Search.map((movie) => [movie.imdbID, movie]),
            ).values(),
          ];*/

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (error.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, error.name],
  );
  return { movies, loading, error };
}
