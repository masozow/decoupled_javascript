import { UserCardList } from './features/user/ui/components/UserCardList.js';
import { ApiUserRepository } from './features/user/infrastructure/ApiUserRepository.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';
import { debounce } from './shared/utils/debounce.js';
import { UserService } from './features/user/application/UserService.js';
try {
    const usersRepo = new ApiUserRepository(HttpClient);
    const userService = new UserService({ userRepo: usersRepo });

    const renderUsers = (users) => {
        const results = document.getElementById('results');
        results.innerHTML = UserCardList(users);
    }

    //#region Search logic
    const searchBox = document.getElementById('search');
    const handleSearch = async (query) => {
        const users = await userService.search(query);
        console.log(users);
        renderUsers(users);
    }
    const debouncedSearch = debounce(handleSearch, 500);
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
        const newUsers = handler({ card: btn.closest('.card') });
        console.log('New users:', newUsers);
        renderUsers(render);
    });
    //#endregion
} catch (error) {
    console.error(error);
}


//import('./shared/tests/index.js');