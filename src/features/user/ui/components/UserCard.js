export const UserCard = (user) => `
    <article data-id='${user.id}' class='card ${user.isFavorite ? 'fav' : ''}'>
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <button data-action='toggle-favorite'>
            ${user.isFavorite ? '[*] Remove favorite' : '[ ] Mark as favorite'}
        </button>
    </article>
`;