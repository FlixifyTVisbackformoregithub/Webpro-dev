const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is required' }),
        };
    }

    try {
        const response = await fetch(decodeURIComponent(url), {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const body = await response.text();
        return {
            statusCode: response.status,
            body: body,
            headers: {
                'Content-Type': 'text/html',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch the requested URL' }),
        };
    }
};
