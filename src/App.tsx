import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Favorites from "./components/routes/Favorites";
import Home from "./components/routes/Home";
import Show from "./components/routes/Show";
import SpeedTest from "./components/shared/SpeedTest/SpeedTest";
import Toast from "./components/shared/Toast/Toast";
import useFavorites from "./hooks/useFavorites";
import { GlobalContext } from "./hooks/useGlobalContext";
import { useTvMaze } from "./hooks/useTvMaze";
import { Error as IError } from "./types/types";

const App = () => {
    const [error, setError] = useState<IError | null>(null);
    const tvMazeContext = useTvMaze(setError);
    const favorites = useFavorites();

    const context = { ...tvMazeContext, ...favorites };

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
            <SpeedTest setError={setError} />
        </div>
    );
};

export default App;
