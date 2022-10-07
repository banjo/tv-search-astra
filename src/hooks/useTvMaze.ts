import { useState } from "react";
import { Show, TVMazeSearchResult } from "../types/types";

const URL = "http://api.tvmaze.com";

export const useTvMaze = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");

    const findShowById = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${URL}/shows/${id}`);
            const data = await response.json();
            setSelectedShow(data);
            setIsLoading(false);
        } catch (error) {
            if (typeof error === "string") {
                setError(error);
            } else if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const search = async (query: string) => {
        setError(null);
        setIsLoading(true);

        try {
            const result = await fetch(`${URL}/search/shows?q=${query}`);
            const json = (await result.json()) as TVMazeSearchResult[];
            setShows(json.map((item) => item.show));
        } catch (error: unknown) {
            if (typeof error === "string") {
                setError(error);
            } else if (error instanceof Error) {
                setError(error.message);
            }
        }

        setIsLoading(false);
    };

    const resetShows = () => {
        setShows([]);
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
    };
};
