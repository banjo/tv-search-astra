import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useTvMazeContext } from "../../hooks/useGlobalContext";
import Boop from "./Boop";

interface Props {
    showId: number;
}

const FavoriteButton = ({ showId }: Props) => {
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const { favorites, addFavorite, removeFavorite } = useTvMazeContext();

    useEffect(() => {
        const isFavorited = favorites.some((favorite) => favorite === showId);
        setIsFavorited(isFavorited);
    }, [favorites]);

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (isFavorited) {
            removeFavorite(showId);
        } else {
            addFavorite(showId);
        }
    };

    return (
        <>
            <Boop config={{ rotation: 10 }}>
                <div
                    className="favorite-button"
                    onClick={onClick}
                    title={
                        isFavorited
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {isFavorited ? <MdFavorite /> : <MdFavoriteBorder />}
                </div>
            </Boop>
        </>
    );
};

export default FavoriteButton;
