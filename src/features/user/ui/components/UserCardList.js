import { UserCard } from "./UserCard.js";
export const UserCardList = (users) => `
    <div class='grid'>
        ${users.map((user) => UserCard(user)).join('')}
    </div>
`;