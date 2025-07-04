const FAVORITES_KEY = 'favoritos';

export const getFavorites = (): number[] => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (id: number) => {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        const updated = [...favorites, id];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }
};

export const removeFavorite = (id: number) => {
    const favorites = getFavorites();
    const updated = favorites.filter(favId => favId !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};
