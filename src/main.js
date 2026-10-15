import { BaseApiURL } from './shared/dictioanries/ApiURLs.js';
const error_prefix = '[Fetch error] ';
try {
    const URL = `${BaseApiURL}/users`;
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`${error_prefix} Status:${response.status} - ${response.statusText}. At: ${URL}`);
    console.log(await response.json());
} catch (error) {
    console.error(`${error_prefix}`, error);
}

