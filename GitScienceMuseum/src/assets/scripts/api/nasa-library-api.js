import { fetchAPI } from "./fetch-api.js";

/* ------- NASA Image and Video Library ------- */

// Get RECENT content
async function fetchRecent() {
    const url = `https://images-assets.nasa.gov/recent.json`;
    // https://images-api.nasa.gov/asset/?orderby=recent
    const data = await fetchAPI(url);
    return data;
}

async function fetchPopular() {
    const url = `https://images-assets.nasa.gov/popular.json`;
    // https://images-api.nasa.gov/asset/?orderby=popular
    const data = await fetchAPI(url);
    return data;
}

async function fetchUserSearch(user_input) {
    var query = user_input.query;
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    const data = await fetchAPI(url);
    return data;
}

export { fetchRecent, fetchPopular, fetchUserSearch };