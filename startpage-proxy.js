const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { query } = event.queryStringParameters;

    // Ensure the query is properly URL encoded
    const searchQuery = encodeURIComponent(query);
    const startpageURL = `https://www.startpage.com/sp/search?query=${searchQuery}`;
    
    try {
        const response = await fetch(startpageURL, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const html = await response.text();
        return {
            statusCode: 200,
            body: html, // Return the raw HTML for the search results
            headers: {
                'Content-Type': 'text/html',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch results from Startpage' }),
        };
    }
};
