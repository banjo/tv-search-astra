import { useEffect, useState } from "react";

const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const favorites = window.localStorage.getItem("favorites");
        return favorites ? JSON.parse(favorites) : [];
    });

    useEffect(() => {
        window.localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (favorite: number) => {
        setFavorites([...favorites, favorite]);
    };
    const removeFavorite = (favorite: number) => {
        setFavorites(favorites.filter((item) => item !== favorite));
    };
    return {
        favorites,
        addFavorite,
        removeFavorite,
    };
};

export default useFavorites;
