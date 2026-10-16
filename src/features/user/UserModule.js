import { UserService } from '../user/application/UserService.js';
import { ApiUserRepository } from '../user/infrastructure/ApiUserRepository.js';
import { HttpClient } from '../../shared/infrastructure/HttpClient.js';
import { userController } from './ui/UserController.js';
export const userModule = ({ input, results }) => {
    const usersRepo = new ApiUserRepository(HttpClient);
    const userService = new UserService({ userRepo: usersRepo });
    userController(userService, { input, results });
}