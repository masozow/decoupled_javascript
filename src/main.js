import { UserCardList } from './features/user/ui/components/UserCardList.js';
import { ApiUserRepository } from './features/user/infrastructure/ApiUserRepository.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';
try {
    const results = document.getElementById('results');
    const usersRepo = new ApiUserRepository(HttpClient);
    const users = await usersRepo.search('le');
    users[2].isFavorite = true;
    console.log(users);
    results.innerHTML = UserCardList(users);
} catch (error) {
    console.error(error);
}


import('./shared/tests/index.js');