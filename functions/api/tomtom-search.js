/**
 * TomTom Search API Proxy
 * Handles autocomplete/fuzzy search requests
 * Keeps API key secure on server-side
 */
export async function onRequest(context) {
    const url = new URL(context.request.url);

    // Get query parameters
    const query = url.searchParams.get('query');
    const lat = url.searchParams.get('lat') || '12.9716';  // Default to Bengaluru
    const lon = url.searchParams.get('lon') || '77.5946';
    const limit = url.searchParams.get('limit') || '5';

    if (!query) {
        return new Response(JSON.stringify({ error: 'Missing query parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Get API key from environment
    const apiKey = context.env.VITE_TOMTOM_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API key not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // TomTom Fuzzy Search API
    // Documentation: https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
    const tomtomUrl = new URL('https://api.tomtom.com/search/2/search/' + encodeURIComponent(query) + '.json');

    tomtomUrl.searchParams.set('key', apiKey);
    tomtomUrl.searchParams.set('limit', limit);
    tomtomUrl.searchParams.set('countrySet', 'IN');  // India only
    tomtomUrl.searchParams.set('lat', lat);
    tomtomUrl.searchParams.set('lon', lon);
    tomtomUrl.searchParams.set('radius', '50000');  // 50km radius for location bias
    tomtomUrl.searchParams.set('language', 'en-US');
    tomtomUrl.searchParams.set('typeahead', 'true');  // Enable autocomplete mode

    try {
        const response = await fetch(tomtomUrl.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('TomTom API error:', response.status, errorText);
            return new Response(JSON.stringify({ error: 'Search API error', status: response.status }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = await response.json();

        // Transform TomTom response to a simpler format for the frontend
        const results = data.results.map(result => ({
            display_name: result.address.freeformAddress || result.poi?.name || 'Unknown',
            name: result.poi?.name || result.address.localName || result.address.municipality || '',
            lat: result.position.lat,
            lon: result.position.lon,
            type: result.type,
            address: result.address
        }));

        return new Response(JSON.stringify({ results }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300'  // Cache for 5 minutes
            }
        });

    } catch (err) {
        console.error('TomTom Search proxy error:', err);
        return new Response(JSON.stringify({ error: 'Proxy error: ' + err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
