import { UsersURL } from '../../../shared/dictionaries/ApiURLs.js';
import { User } from '../domain/User.js';
export class ApiUserRepository {
    static #errorPrefix = '[Infra error] ApiUserRepository';
    constructor(httpClient) {
        if (typeof httpClient !== 'function') throw new Error(ApiUserRepository.#errorPrefix + ' HttpClient must be a function');
        this.httpClient = httpClient;
        this.endpoint = UsersURL;
    }

    async search(query) {
        if (typeof query != 'string') throw new Error(ApiUserRepository.#errorPrefix + ' Query is required');

        const response = await this.httpClient({ url: this.endpoint });
        if (!Array.isArray(response))
            throw new Error(
                ApiUserRepository.#errorPrefix + `API response wasn't a valid Array: ${response}`
            );
        const mappedUsers = response.map((user) => new User(user.id, user.name, user.email));
        if (!query.trim()) return mappedUsers;
        return mappedUsers.filter((user) => user.name.includes(query));
    }

}