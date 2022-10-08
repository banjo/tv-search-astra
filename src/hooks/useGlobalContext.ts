import React, { Dispatch, SetStateAction, useContext } from "react";
import { Show } from "../types/types";

export interface GlobalContextInterface {
    selectedShow: Show | null;
    setSelectedShow: Dispatch<SetStateAction<Show | null>>;
    search: (query: string) => Promise<void>;
    shows: Show[];
    resetShows: () => void;
    findShowById: (id: number) => Promise<void>;
    clearError: () => void;
    isLoading: boolean;
    favorites: number[];
    addFavorite: (favorite: number) => void;
    removeFavorite: (favorite: number) => void;
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
});

const useTvMazeContext = () => useContext(GlobalContext);

export { GlobalContext, useTvMazeContext };
