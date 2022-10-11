import { useEffect, useState, createRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Show } from "../../types/types";
import { useTvMazeContext } from "../../hooks/useGlobalContext";
import Card from "../shared/Card";
import Loading from "../shared/Loading";

const Home = () => {
    const [hasFetched, setHasFetched] = useState(false);
    const [query, setQuery] = useState<string>("");
    const { search, setSelectedShow, shows, resetShows, isLoading } =
        useTvMazeContext();
    const { debounce, setDirectly } = useDebounce(query, 500);
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const refs = shows.map(() => createRef<HTMLDivElement>());
    const [searchParams] = useSearchParams();
    const searchElement = createRef<HTMLInputElement>();
    const [showResults, setShowResults] = useState<boolean>(false);

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

        const abortController = new AbortController();

        const fetchData = async (query: string, signal: AbortSignal) => {
            await search(query, signal);
            setHasFetched(true);
            setShowResults(true);
        };

        resetShows();
        fetchData(debounce, abortController.signal);

        return () => {
            abortController.abort();
            setHasFetched(false);
            setShowResults(false);
        };
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

    const noResults = () => {
        return shows.length === 0 && hasFetched && !isLoading;
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

            {noResults() && <div>No shows found</div>}

            <div
                className={`results ${
                    showResults && !isLoading ? "" : "hidden-results"
                }`}
            >
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
