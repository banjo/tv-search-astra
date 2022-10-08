import { useEffect, useState, createRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { Show } from "../../types/types";
import { useTvMazeContext } from "../../hooks/useGlobalContext";
import Card from "../shared/card";

const Home = () => {
    const [query, setQuery] = useState<string>("");
    const { search, setSelectedShow, shows, resetShows } = useTvMazeContext();
    const { debounce } = useDebounce(query, 500);
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const refs = shows.map(() => createRef<HTMLDivElement>());

    useEffect(() => {
        if (debounce === null || debounce.length === 0) {
            resetShows();
            return;
        }

        const fetchData = async (query: string) => {
            await search(query);
        };

        fetchData(debounce);
    }, [debounce]);

    const handleClick = async (show: Show) => {
        setSelectedShow(show);
        resetShows();
        navigate(`/show/${show.id}`);
    };

    const handleKeyboardNavigation = (e: React.KeyboardEvent) => {
        let newValue = 0;

        if (e.key === "ArrowUp") {
            e.preventDefault();
            newValue = (selectedIndex - 1 + shows.length) % shows.length;
            setSelectedIndex(newValue);
        }

        if (e.key === "ArrowDown" || e.key === "Tab") {
            e.preventDefault();
            newValue = (selectedIndex + 1) % shows.length;
            setSelectedIndex(newValue);
        }

        const ref = refs[newValue];
        ref?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });

        if (e.key === "Enter") {
            e.preventDefault();
            handleClick(shows[selectedIndex]);
        }
    };

    return (
        <div className="search-container">
            <h1 className="title">TV Series</h1>
            <input
                type="text"
                id="search-input"
                value={query}
                placeholder="Friends..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyboardNavigation}
            />

            <div className="results">
                {shows?.map((show, index) => {
                    return (
                        <Card
                            refName={refs[index]}
                            show={show}
                            key={show.id}
                            selected={selectedIndex === index}
                            onClick={handleClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
