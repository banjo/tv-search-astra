import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { cleanString, isNumber } from "../../helpers/util";
import { useTvMazeContext } from "../../hooks/useGlobalContext";

const Show = () => {
    const { selectedShow, findShowById } = useTvMazeContext();
    const { id } = useParams();
    const navigate = useNavigate();

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

    if (!selectedShow) {
        return null;
    }

    return (
        <div className="show-container">
            <Link className="btn" to="/">
                Back
            </Link>
            <div className="show-view">
                <div className="side">
                    <div className="title">{selectedShow.name}</div>
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

                    <img src={selectedShow.image.original} alt="" />
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
                                <b>{selectedShow.rating.average}</b>
                                <span>/ 10</span>
                            </div>
                        ) : (
                            <div>No rating</div>
                        )}
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
