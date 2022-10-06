import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/routes/Home";
import Show from "./components/routes/Show";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/show/:id" element={<Show />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
