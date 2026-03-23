const axios = require('axios');

// The main "Bootstrap" endpoint contains players, teams, and gameweek info
const FPL_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';

// We use a simple in-memory cache so we don't spam the FPL API on every refresh
let cache = {
    data: null,
    lastFetched: null
};

// Cache for 5 minutes (300,000 milliseconds)
const CACHE_DURATION = 5 * 60 * 1000;

const getGeneralData = async () => {
    const now = Date.now();

    // 1. Check if we have valid data in the cache
    if (cache.data && (now - cache.lastFetched < CACHE_DURATION)) {
        console.log('Serving FPL data from cache...');
        return cache.data;
    }

    // 2. If no cache, fetch fresh data
    try {
        console.log('Fetching fresh data from official FPL API...');
        const response = await axios.get(FPL_API_URL, {
            headers: {
                'User-Agent': 'FPL-Analytics-App-Educational'
            }
        });

        // Update the cache with the new data
        cache.data = response.data;
        cache.lastFetched = now;

        return response.data;
    } catch (error) {
        console.error('Error fetching from FPL API:', error.message);
        
        // If the API is down but we have old data, return the old data as a fallback
        if (cache.data) {
            console.log('API Error. Serving stale cache as fallback.');
            return cache.data;
        }
        
        throw new Error('Could not fetch FPL data and no cache available.');
    }
};

module.exports = {
    getGeneralData
};