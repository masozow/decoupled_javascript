import { UserCardList } from './components/UserCardList.js';
import { debounce } from '../../../shared/utils/debounce.js';
import { Empty, Loading, ErrorMessage } from '../../../shared/ui/components/index.js';

const error_prefix = '[UI error] UserController.';

const renderUsers = (state, query) => {
    if (!state) throw new Error(error_prefix + ' State is required');
    if (query === undefined) throw new Error(error_prefix + ' Query is requried');
    if (state.isError) return ErrorMessage();
    if (state.isLoading) return Loading();
    if (state.users.length === 0) return query ? Empty() : '';
    return UserCardList(state.users);
}

export const userController = (userService, dom) => {
    if (!userService) throw new Error(error_prefix + ' userService is required.');
    const { input, results } = dom;
    if (!input || !results) throw new Error(error_prefix + " Input and Results Elements are required");
    userService.subscribe((state) => results.innerHTML = renderUsers(state, input.value.trim()))
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