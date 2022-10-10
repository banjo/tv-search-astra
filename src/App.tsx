import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Favorites from "./components/routes/Favorites";
import Home from "./components/routes/Home";
import Show from "./components/routes/Show";
import Toast from "./components/shared/Toast";
import useFavorites from "./hooks/useFavorites";
import { GlobalContext } from "./hooks/useGlobalContext";
import { useInternetSpeedTest } from "./hooks/useInternetSpeedTest";
import { useTvMaze } from "./hooks/useTvMaze";

const App = () => {
    const {
        search,
        selectedShow,
        shows,
        setSelectedShow,
        resetShows,
        findShowById,
        error,
        clearError,
        setError,
        isLoading,
        findFavorites,
        favoriteShows,
    } = useTvMaze();

    const { addFavorite, removeFavorite, favorites } = useFavorites();

    const { url, handleLoad, result } = useInternetSpeedTest({
        threshold: 1000,
    });

    useEffect(() => {
        if (result === "slow") {
            setError({
                message: "You seem to have a slow internet connection",
                type: "warning",
            });
        }
    }, [result]);

    return (
        <div className="app">
            <GlobalContext.Provider
                value={{
                    search,
                    selectedShow,
                    shows,
                    setSelectedShow,
                    resetShows,
                    findShowById,
                    clearError,
                    isLoading,
                    favorites,
                    removeFavorite,
                    addFavorite,
                    findFavorites,
                    favoriteShows,
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/show/:id" element={<Show />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
                <div className="toast-wrapper">
                    <Toast message={error?.message} type={error?.type} />
                </div>
            </GlobalContext.Provider>
            <img src={url} alt="" className="hidden" onLoad={handleLoad} />
        </div>
    );
};

export default App;
