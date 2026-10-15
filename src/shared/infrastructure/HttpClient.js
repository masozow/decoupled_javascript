export const HttpClient = async ({ url, options = {}, fetch = window.fetch }) => {
    const error_prefix = '[Fetch error] ';
    try {
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        }
        if (options.body) config.body = JSON.stringify(options.body);
        const response = await fetch(url, config);
        if (!response.ok) throw new Error(`${error_prefix} Status:${response.status} - ${response.statusText}. At: ${URL}`);
        return response.json();
    } catch (error) {
        console.error(`${error_prefix}`, error);
        throw error;
    }
}
