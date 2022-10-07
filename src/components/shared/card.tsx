import { Show } from "../../types/types";
import DOMPurify from "dompurify";
interface CardProps {
    show: Show;
    selected: boolean;
    onClick: (show: Show) => Promise<void>;
    refName: any;
}

const Card = ({ show, onClick, selected = false, refName }: CardProps) => {
    const cleanString = (str: string) => {
        return DOMPurify.sanitize(str);
    };

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
                <h3 className="title">{show.name}</h3>
                <div className="summary">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: cleanString(show.summary),
                        }}
                    ></div>
                </div>

                <div className="genres">
                    {show.genres.map((genre) => (
                        <span className="genre" key={genre}>
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
