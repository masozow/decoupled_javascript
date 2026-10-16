import { UserCardList } from './features/user/ui/components/UserCardList.js';
import { ApiUserRepository } from './features/user/infrastructure/ApiUserRepository.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';
import { debounce } from './shared/utils/debounce.js';
import { UserService } from './features/user/application/UserService.js';
document.addEventListener('DOMContentLoaded', () => {
    try {
        const usersRepo = new ApiUserRepository(HttpClient);
        const userService = new UserService({ userRepo: usersRepo });
        const results = document.getElementById('results');
        const renderUsers = (state) => {
            results.innerHTML = UserCardList(state.users);
        }
        userService.subscribe(renderUsers)
        //#region Search logic
        const searchBox = document.getElementById('search');
        // const handleSearch = async (query) => {
        //     const users = await userService.search(query);
        //     console.log(users);
        //     renderUsers(users);
        // }
        const debouncedSearch = debounce(async (query) => await userService.search(query), 500);
        searchBox.addEventListener('input', (e) => debouncedSearch(e.target.value));
        //#endregion
        //#region Favorites logic
        const actions = {
            'toggle-favorite': ({ card }) => userService.toggleFavorite(Number(card.dataset.id))
        }
        results.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const handler = actions[btn.dataset.action];
            if (!handler) return;
            handler({ card: btn.closest('.card') });
        });
        //#endregion
    } catch (error) {
        console.error(error);
    }
})
//import('./shared/tests/index.js');