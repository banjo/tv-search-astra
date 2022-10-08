import { useRef, useState } from "react";
import { Show, TVMazeSearchResult } from "../types/types";
import { Error as IError } from "../types/types";

const URL = "http://api.tvmaze.com";

export const useTvMaze = () => {
    const idCache = useRef<{ [id: number]: Show }>({});
    const queryCache = useRef<{ [query: string]: Show[] }>({});
    const [shows, setShows] = useState<Show[]>([]);
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IError | null>(null);

    const findShowById = async (id: number) => {
        if (!id) return;

        if (idCache.current[id]) {
            setSelectedShow(idCache.current[id]);
            return;
        } else {
            try {
                setIsLoading(true);
                const response = await fetch(`${URL}/shows/${id}`);
                const data = await response.json();
                idCache.current[id] = data;
                setSelectedShow(data);
            } catch (error) {
                if (typeof error === "string") {
                    setError({ message: error, type: "error" });
                } else if (error instanceof Error) {
                    setError({ message: error.message, type: "error" });
                }
            }
        }

        setIsLoading(false);
    };

    const search = async (query: string) => {
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
                const result = await fetch(`${URL}/search/shows?q=${query}`);
                const json = (await result.json()) as TVMazeSearchResult[];
                const shows = json.map((item) => item.show);

                setShows(shows);
                queryCache.current[query] = shows;
            } catch (error: unknown) {
                if (typeof error === "string") {
                    setError({ message: error, type: "error" });
                } else if (error instanceof Error) {
                    setError({ message: error.message, type: "error" });
                }
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
        error,
        isLoading,
        setSelectedShow,
        selectedShow,
        search,
        shows,
        resetShows,
        findShowById,
        clearError,
        setError,
    };
};
