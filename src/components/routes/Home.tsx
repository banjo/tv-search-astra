import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { Show } from "../../types/types";
import { useTvMazeContext } from "../../hooks/useGlobalContext";

const Home = () => {
    const [query, setQuery] = useState<string>("");
    const { search, setSelectedShow, shows, resetShows } = useTvMazeContext();
    const { debounce } = useDebounce(query, 500);
    const navigate = useNavigate();

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

    return (
        <div className="">
            <input
                type="text"
                className="my-5"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {shows?.map((show) => (
                <button onClick={() => handleClick(show)} key={show.id}>
                    {show.name}
                </button>
            ))}
        </div>
    );
};

export default Home;
