export const LocalFavoriteRepository = () => {
    const error_prefix = '[Infra error] LocalFavoriteRepository.'
    return {
        getFavorites: () => {
            try {
                return JSON.parse(localStorage.getItem('favorites')) || [];
            } catch (error) {
                console.error(error_prefix + error);
                return [];
            }
        },
        setFavorites: (favorites) => {
            try {
                localStorage.setItem('favorites', JSON.stringify(favorites));
            } catch (error) {
                console.error(error_prefix + error);
            }
        }
    }
}