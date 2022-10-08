import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { cleanString, isNumber } from "../../helpers/util";
import { useTvMazeContext } from "../../hooks/useGlobalContext";
import { BsStarFill } from "react-icons/bs";
import { FaImdb } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FavoriteButton from "../shared/FavoriteButton";

const Show = () => {
    const { selectedShow, findShowById } = useTvMazeContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [activateFadeIn, setActivateFadeIn] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!isNumber(Number(id))) {
            navigate("/");
        }
        const fetchShow = async (id: number) => {
            await findShowById(id);
        };

        if (!selectedShow) {
            fetchShow(Number(id));
        }
    }, [selectedShow, id]);

    const goBackLink = () => {
        const query = searchParams.get("query");
        const from = searchParams.get("from");

        if (from === "favorites") {
            return "/favorites";
        }

        if (query) return `/?query=${query}`;

        return "/";
    };

    useEffect(() => {
        setTimeout(() => setActivateFadeIn(true), 100);
    }, []);

    if (!selectedShow) {
        return null;
    }

    return (
        <div className={`show-container ${activateFadeIn ? "" : "hide"}`}>
            <Link className="btn" to={goBackLink()}>
                Back
            </Link>
            <div className="show-view">
                <div className="side">
                    <div className="top">
                        <div className="title">{selectedShow.name}</div>
                        <FavoriteButton showId={selectedShow.id} />
                    </div>
                    <div className="info">
                        <div>
                            {selectedShow.premiered?.slice(0, 4) ??
                                "No start date"}{" "}
                            - {selectedShow.ended?.slice(0, 4) ?? "No end date"}
                        </div>
                        <div>{selectedShow.language}</div>
                        {selectedShow.runtime && (
                            <div>{selectedShow.runtime}m</div>
                        )}
                    </div>

                    {selectedShow.image && (
                        <img src={selectedShow.image.original} alt="" />
                    )}
                </div>
                <div className="main">
                    <div className="info">
                        <div className="genres">
                            {selectedShow.genres.map((genre) => (
                                <span className="genre" key={genre}>
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {selectedShow.rating.average ? (
                            <div className="rating">
                                <BsStarFill className="rating-star" />

                                <b>{selectedShow.rating.average}</b>
                                <span>/ 10</span>
                            </div>
                        ) : (
                            <div>No rating</div>
                        )}

                        <div className="links">
                            {selectedShow.externals?.imdb && (
                                <a
                                    href={`https://www.imdb.com/title/${selectedShow.externals.imdb}/`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaImdb />
                                </a>
                            )}
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: cleanString(selectedShow.summary),
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Show;
