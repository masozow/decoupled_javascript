export class UserService {
    static #error_prefix = '[App error] UserSearchService.';
    #state;
    constructor({ userRepo, favRepo }) {
        if (!userRepo) throw new Error(UserService.#error_prefix + ' User repository is required.');
        if (!favRepo) throw new Error(UserService.#error_prefix + ' Favorites repository is required.');
        this.userRepo = userRepo;
        this.favRepo = favRepo;
        this.#state = {
            isLoading: false,
            isError: false,
            users: [],
        }
        this.currentReqId = 0;
        this.listeners = new Set();
        //We store a query value while an instance of this object lives
        this.lastQuery = '';
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
        //Creating a unique ticket for this search
        const reqId = ++this.currentReqId;
        try {
            if (typeof query !== 'string') throw new Error(UserService.#error_prefix + ' Query must be as string.');
            const normalizedQuery = query.trim();
            // We compare the value of the last call of this same instance,
            // with the current query value we are getting, if it's the same,
            // we save network resources and renders while ignoring it.
            if (this.lastQuery === normalizedQuery) return;
            this.lastQuery = normalizedQuery;
            this.#state.isError = false;
            this.#state.isLoading = true;
            this.#notify();
            //We were updating state directly, but state should only be 
            //updated when it's been synced with favorites
            const users = await this.userRepo.search(normalizedQuery);
            //If there's an old search, we ignore it
            if (reqId !== this.currentReqId) return;
            const { getFavorites } = this.favRepo();
            //#region Sync users isFavorite value with favorites state
            const favorites = getFavorites();
            users.forEach((user) => user.isFavorite = favorites.includes(user.id));
            this.#state.users = users;
            this.#state.isLoading = false;
            this.#notify();
            //#endregion
        } catch (error) {
            //Even errors from an old search will be ignored
            if (this.currentReqId !== reqId) return;
            console.error(UserService.#error_prefix + error);
            this.#state.isError = true;
            this.#state.isLoading = false;
            this.#notify();
        }
    }

    toggleFavorite(userId) {
        if (!userId) throw new Error(UserService.#error_prefix + ' UserId is required.');
        const { getFavorites, setFavorites } = this.favRepo();
        const favorites = getFavorites();
        //#region Updating favorites state
        if (favorites.includes(userId)) {
            favorites = favorites.filter((id) => id !== userId)
        } else {
            setFavorites(favorites);
        }
        //#endregion

        //Updating individual user state
        const userFound = this.#state.users.find((user) => user.id === userId);
        if (userFound) userFound.toggleFavorite();
        //Return synced users after update, but this needs that every component
        //ask for the state.
        this.#notify();
    }
}