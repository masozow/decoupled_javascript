export class UserService {
    static #error_prefix = '[App error] UserSearchService.';
    #state;
    constructor({ userRepo }) {
        if (!userRepo) throw new Error(UserService.#error_prefix + ' User repository is required');
        this.userRepo = userRepo;
        this.#state = {
            users: [],
            favorites: []
        }

        this.listeners = new Set();
    }
    #notify() {
        this.listeners.forEach((listener) => listener(this.#state));
    }
    subscribe(listener) {
        if (typeof listener !== 'function') throw new Error(UserService.#error_prefix + ' Listener must be a function');
        this.listeners.add(listener);
        listener(this.#state);
        return () => this.listeners.delete(listener);
    }
    async search(query) {
        if (typeof query !== 'string') throw new Error(UserService.#error_prefix + ' Query must be as string.');
        this.#state.users = await this.userRepo.search(query);
        console.log(this.#state.users);
        //#region Sync users isFavorite value with favorites state
        this.#state.users.forEach((user) => user.isFavorite = this.#state.favorites.includes(user.id));
        console.log('Users at Service:', this.#state.users);
        this.#notify();
        //#endregion
    }

    toggleFavorite(userId) {
        if (!userId) throw new Error(UserService.#error_prefix + ' UserId is required.');
        //#region Updating favorites state
        if (this.#state.favorites.includes(userId)) {
            this.#state.favorites = this.#state.favorites.filter((id) => id !== userId)
        } else {
            this.#state.favorites.push(userId);
        }
        console.log('Favorites at service: ', this.#state.favorites);
        //#endregion

        //Updating individual user state
        const userFound = this.#state.users.find((user) => user.id === userId);
        if (userFound) userFound.toggleFavorite();
        //Return synced users after update, but this needs that every component
        //ask for the state.
        this.#notify();
    }
}