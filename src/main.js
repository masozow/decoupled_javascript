import { UsersURL } from './shared/dictionaries/ApiURLs.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';
import { UserCardList } from './features/user/ui/components/UserCardList.js';
import { User } from './features/user/domain/User.js';
const response = await HttpClient({ url: UsersURL })
const results = document.getElementById('results');
const users = response.map((user) => new User(user.id, user.name, user.email));
users[2].isFavorite = true;
console.log(users);
results.innerHTML = UserCardList(users);

