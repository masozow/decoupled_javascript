import { ApiUserRepository } from './features/user/infrastructure/ApiUserRepository.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';
import { UserService } from './features/user/application/UserService.js';
import { userController } from './features/user/ui/UserController.js';
document.addEventListener('DOMContentLoaded', () => {
    try {
        const usersRepo = new ApiUserRepository(HttpClient);
        const userService = new UserService({ userRepo: usersRepo });
        const results = document.getElementById('results');
        const searchBox = document.getElementById('search');
        userController(userService, { input: searchBox, results: results });
        //#endregion
    } catch (error) {
        console.error(error);
    }
})
//import('./shared/tests/index.js');