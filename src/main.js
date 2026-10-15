import { UsersURL } from './shared/dictionaries/ApiURLs.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';
import { User } from './features/user/domain/User.js';
import { UserCard } from './features/user/ui/components/UserCard.js';
const response = await HttpClient({ url: UsersURL })
const results = document.getElementById('results');
const users = response.map((user) => new User(user.id, user.name, user.email));
users[2].isFavorite = true;
const usersCards = users.map((user) => UserCard(user));
results.innerHTML = usersCards.join('');
console.log(users);
