import { UserCardList } from './features/user/ui/components/UserCardList.js';
import { ApiUserRepository } from './features/user/infrastructure/ApiUserRepository.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';
try {
    const usersRepo = new ApiUserRepository(HttpClient);
    const results = document.getElementById('results');
    const searchBox = document.getElementById('search');
    const handleSearch = async (query) => {
        const users = await usersRepo.search(query);
        console.log(users);
        results.innerHTML = UserCardList(users);
    }
    searchBox.addEventListener('input', (e) => handleSearch(e.target.value));
} catch (error) {
    console.error(error);
}


//import('./shared/tests/index.js');