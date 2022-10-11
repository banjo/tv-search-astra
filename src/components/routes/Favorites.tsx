import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTvMazeContext } from "../../hooks/useGlobalContext";
import { Show } from "../../types/types";
import Card from "../shared/Card/Card";

const Favorites = () => {
    const { favorites, findFavorites, favoriteShows, setSelectedShow } =
        useTvMazeContext();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async (signal: AbortSignal) => {
            await findFavorites(favorites, signal);
        };

        fetchData(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [favorites]);

    const handleClick = (show: Show) => {
        setSelectedShow(show);
        navigate(`/show/${show.id}?from=favorites`);
    };

    return (
        <div className="favorites-container">
            <Link className="btn" to="/">
                Back
            </Link>
            <h1 className="title">Favorites</h1>

            <div className="results">
                {favoriteShows?.map((show, index) => {
                    return (
                        <Card
                            show={show}
                            key={show.id}
                            onClick={() => handleClick(show)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Favorites;
