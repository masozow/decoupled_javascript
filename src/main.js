import { BaseApiURL } from './shared/dictioanries/ApiURLs.js';
import { HttpClient } from './shared/infrastructure/HttpClient.js';

const URL = `${BaseApiURL}/users`;
console.log(await HttpClient({ url: URL }));
