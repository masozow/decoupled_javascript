import { HttpClient } from "../../infrastructure/HttpClient.js";
import { describe, it, expect } from "../miniTest.js";
const mockData = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: "Mary", email: 'mary@example.com' }
]
const fakeURL = 'https://nourl.com';
const fakeFetchFactory = ({ status = 200, ok = true, statusText = '', data = [] } = {}) => {
    return async () => {
        return {
            status,
            statusText,
            ok,
            json: async () => data
        }
    }
}

describe('HttpClient tests', async () => {
    it('Happy path', async () => {
        //1. Arrange
        const fakeFetch = fakeFetchFactory({ data: mockData });
        //2. Act
        /** @type {Array} */
        const results = await HttpClient({ url: fakeURL, fetch: fakeFetch });
        //3. Assert
        expect(results.length).toBe(2);
        expect(results[0].name).toBe('John');
    })
});