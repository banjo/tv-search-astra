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
}

const GlobalContext = React.createContext<GlobalContextInterface>({
    selectedShow: null,
    setSelectedShow: () => 0,
    search: () => Promise.resolve(),
    shows: [],
    resetShows: () => 0,
    findShowById: () => Promise.resolve(),
    clearError: () => 0,
});

const useTvMazeContext = () => useContext(GlobalContext);

export { GlobalContext, useTvMazeContext };
