import { useRef, useState } from "react";
import { handleError } from "../helpers/error";
import { Show, TVMazeSearchResult } from "../types/types";
import { Error as IError } from "../types/types";

const URL = "https://api.tvmaze.com";

export const useTvMaze = (
    setError: React.Dispatch<React.SetStateAction<IError | null>>
) => {
    const idCache = useRef<{ [id: number]: Show }>({});
    const queryCache = useRef<{ [query: string]: Show[] }>({});
    const [shows, setShows] = useState<Show[]>([]);
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [favoriteShows, setFavoriteShows] = useState<Show[]>([]);

    const findShowById = async (id: number, signal: AbortSignal) => {
        if (!id) return;

        if (idCache.current[id]) {
            setSelectedShow(idCache.current[id]);
            return;
        } else {
            try {
                setIsLoading(true);
                const response = await fetch(`${URL}/shows/${id}`, { signal });
                const data = await response.json();
                idCache.current[id] = data;
                setSelectedShow(data);
            } catch (error) {
                handleError(error, setError);
            }
        }

        setIsLoading(false);
    };

    const findFavorites = async (ids: number[], signal: AbortSignal) => {
        if (!ids.length) return;

        setIsLoading(true);
        const idsToFetch: number[] = [];
        const fetchedShows: Show[] = [];

        ids.forEach((id) => {
            const cache = idCache.current[id];
            if (cache) {
                fetchedShows.push(cache);
            } else {
                idsToFetch.push(id);
            }

            return null;
        });

        if (idsToFetch.length) {
            try {
                const res: Show[] = await Promise.all(
                    idsToFetch.map((id) =>
                        fetch(`${URL}/shows/${id}`, { signal }).then((res) =>
                            res.json()
                        )
                    )
                );

                res.forEach((show: Show) => {
                    idCache.current[show.id] = show;
                    fetchedShows.push(show);
                });
            } catch (error) {
                handleError(error, setError);
            }
        }
        setFavoriteShows(fetchedShows);
        setIsLoading(false);
    };

    const search = async (query: string, signal: AbortSignal) => {
        if (!query) return;

        if (query === "error") {
            setError({
                message: "This is a dummy error message",
                type: "error",
            });
            return;
        }

        if (queryCache.current[query]) {
            setShows(queryCache.current[query]);
            return;
        } else {
            try {
                setIsLoading(true);
                const result = await fetch(`${URL}/search/shows?q=${query}`, {
                    signal,
                });
                const json = (await result.json()) as TVMazeSearchResult[];
                const shows = json.map((item) => item.show);

                setShows(shows);
                queryCache.current[query] = shows;
            } catch (error: unknown) {
                handleError(error, setError);
            }
        }

        setIsLoading(false);
    };

    const resetShows = () => {
        setShows([]);
    };

    const clearError = () => {
        setError(null);
    };

    return {
        isLoading,
        setSelectedShow,
        selectedShow,
        search,
        shows,
        resetShows,
        findShowById,
        clearError,
        findFavorites,
        favoriteShows,
    };
};
