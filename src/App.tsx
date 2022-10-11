import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Favorites from "./components/routes/Favorites";
import Home from "./components/routes/Home";
import Show from "./components/routes/Show";
import Toast from "./components/shared/Toast";
import useFavorites from "./hooks/useFavorites";
import { GlobalContext } from "./hooks/useGlobalContext";
import { useInternetSpeedTest } from "./hooks/useInternetSpeedTest";
import { useTvMaze } from "./hooks/useTvMaze";
import { Error as IError } from "./types/types";

const App = () => {
    const [error, setError] = useState<IError | null>(null);
    const tvMazeContext = useTvMaze(setError);
    const favorites = useFavorites();

    const { url, handleLoad, result } = useInternetSpeedTest({
        threshold: 1000,
    });

    const context = { ...tvMazeContext, ...favorites };

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
            <GlobalContext.Provider value={context}>
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
