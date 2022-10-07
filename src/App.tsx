import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/routes/Home";
import Show from "./components/routes/Show";
import Toast from "./components/shared/toast";
import { GlobalContext } from "./hooks/useGlobalContext";
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
    } = useTvMaze();

    return (
        <div className="App">
            <GlobalContext.Provider
                value={{
                    search,
                    selectedShow,
                    shows,
                    setSelectedShow,
                    resetShows,
                    findShowById,
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/show/:id" element={<Show />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
                <Toast message={error} type="error" />
            </GlobalContext.Provider>
        </div>
    );
};

export default App;
