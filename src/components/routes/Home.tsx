import { useEffect, useState, createRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Show } from "../../types/types";
import { useTvMazeContext } from "../../hooks/useGlobalContext";
import Card from "../shared/Card";
import Loading from "../shared/Loading";

const Home = () => {
    const [query, setQuery] = useState<string>("");
    const { search, setSelectedShow, shows, resetShows, isLoading } =
        useTvMazeContext();
    const { debounce, setDirectly } = useDebounce(query, 500);
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const refs = shows.map(() => createRef<HTMLDivElement>());
    const [searchParams] = useSearchParams();
    const searchElement = createRef<HTMLInputElement>();

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setQuery(query);
            setDirectly(query);
            searchElement.current?.focus();
        }
    }, []);

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
        navigate(`/show/${show.id}?query=${query}&from=home`);
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

            <Link className="btn favorite-link" to="/favorites">
                Favorites
            </Link>

            <input
                type="text"
                id="search-input"
                value={query}
                ref={searchElement}
                placeholder="Friends..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyboardNavigation}
            />

            <Loading isLoading={isLoading} className="loader" />

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
