import { esc } from "../../../../shared/utils/escapeHTML.js";

export const UserCard = (user) => `
    <article data-id='${esc(user.id)}' class='card ${user.isFavorite ? 'fav' : ''}'>
        <h3>${esc(user.name)}</h3>
        <p>${esc(user.email)}</p>
        <button data-action='toggle-favorite'>
            ${user.isFavorite ? '[*] Remove favorite' : '[ ] Mark as favorite'}
        </button>
    </article>
`;