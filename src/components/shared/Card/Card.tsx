import { cleanString } from "../../../helpers/util";
import { Show } from "../../../types/types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./card.css";

interface CardProps {
    show: Show;
    selected?: boolean;
    onClick: (show: Show) => void;
    refName?: any;
}

const Card = ({ show, onClick, selected = false, refName }: CardProps) => {
    return (
        <div
            className={`card ${selected ? "selected-card" : ""}`}
            onClick={() => onClick(show)}
            ref={refName}
        >
            {show.image ? (
                <img src={show.image?.medium} alt={`${show.name} image`} />
            ) : (
                <div className="missing-image">No image :(</div>
            )}
            <div className="card-content">
                <h3 className="title">
                    {show.name}{" "}
                    <span className="year">
                        ({show.premiered?.slice(0, 4) ?? "No start date"})
                    </span>
                </h3>
                <div className="summary">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: cleanString(show.summary),
                        }}
                    ></div>
                </div>

                <div className="bottom">
                    <div className="genres">
                        {show.genres.map((genre) => (
                            <span className="genre" key={genre}>
                                {genre}
                            </span>
                        ))}
                    </div>

                    <FavoriteButton showId={show.id} />
                </div>
            </div>
        </div>
    );
};

export default Card;
