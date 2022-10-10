import React, { Dispatch, SetStateAction, useContext } from "react";
import { Show } from "../types/types";

export interface GlobalContextInterface {
    selectedShow: Show | null;
    setSelectedShow: Dispatch<SetStateAction<Show | null>>;
    search: (query: string, signal: AbortSignal) => Promise<void>;
    shows: Show[];
    resetShows: () => void;
    findShowById: (id: number, signal: AbortSignal) => Promise<void>;
    clearError: () => void;
    isLoading: boolean;
    favorites: number[];
    addFavorite: (favorite: number) => void;
    removeFavorite: (favorite: number) => void;
    findFavorites: (ids: number[], signal: AbortSignal) => Promise<void>;
    favoriteShows: Show[];
}

const GlobalContext = React.createContext<GlobalContextInterface>({
    selectedShow: null,
    setSelectedShow: () => 0,
    search: () => Promise.resolve(),
    shows: [],
    resetShows: () => 0,
    findShowById: () => Promise.resolve(),
    clearError: () => 0,
    isLoading: false,
    favorites: [],
    addFavorite: () => 0,
    removeFavorite: () => 0,
    findFavorites: () => Promise.resolve(),
    favoriteShows: [],
});

const useTvMazeContext = () => useContext(GlobalContext);

export { GlobalContext, useTvMazeContext };
