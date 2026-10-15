export class UserService {
    static #error_prefix = '[App error] UserSearchService.';
    #state;
    constructor({ userRepo }) {
        if (!userRepo) throw new Error(UserService.#error_prefix + ' User repository is required');
        this.userRepo = userRepo;
        this.results = results;
        this.#state = {
            users: [],
            favorites: []
        }
    }

    async search(query) {
        if (typeof query !== 'string') throw new Error(UserService.#error_prefix + ' Query must be as string.');
        this.#state.users = await this.userRepo.search(query);
        console.log(this.#state.users);
        return this.#state.users;
    }
    toggleFavorite(userId) {
        if (!userId) throw new Error(UserService.#error_prefix + ' UserId is required.');
        if (this.#state.favorites.includes(userId)) {
            this.#state.favorites = this.#state.favorites.filter((id) => id !== userId)
        } else {
            this.#state.favorites.push(userId);
        }
        const userFound = this.#state.users.find((user) => user.id === userId);
        if (userFound) userFound.toggleFavorite();
        console.log('Favorites:', this.#state.favorites);
    }
}