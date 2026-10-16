import { UserCardList } from './components/UserCardList.js';
import { debounce } from '../../../shared/utils/debounce.js';

const renderUsers = (state) => {
    return UserCardList(state.users);
}

export const userController = (userService, dom) => {
    const error_prefix = '[UI error] UserController.';
    if (!userService) throw new Error(error_prefix + ' userService is required.');
    const { input, results } = dom;
    if (!input || !results) throw new Error(error_prefix + " Input and Results Elements are required");
    userService.subscribe((state) => results.innerHTML = renderUsers(state))
    //#region Search logic
    // const handleSearch = async (query) => {
    //     const users = await userService.search(query);
    //     console.log(users);
    //     renderUsers(users);
    // }
    const debouncedSearch = debounce(async (query) => await userService.search(query), 500);
    input.addEventListener('input', (e) => debouncedSearch(e.target.value));
    //#endregion
    //#region Favorites logic
    const actions = {
        'toggle-favorite': ({ card }) => userService.toggleFavorite(Number(card.dataset.id))
    }
    results.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action_real_function = actions[btn.dataset.action];
        const card = btn.closest('.card');
        if (!card) return;
        action_real_function({ card })
    });
}