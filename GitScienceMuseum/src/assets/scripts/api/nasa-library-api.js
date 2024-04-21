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
    //const url = `https://images-api.nasa.gov/asset/?orderby=popular`;
    const data = await fetchAPI(url);
    return data;
}

async function fetchUserSearch(user_input) {
    const q = user_input.q;
    const page_size = user_input.page_size; 
    const media_type = user_input.media_type;
    const year_start = user_input.year_start;
    const year_end = user_input.year_end;
    const url = `https://images-api.nasa.gov/search?q=${q}&page_size=${page_size}&media_type=${media_type}&year_start=${year_start}&year_end=${year_end}`;
    const data = await fetchAPI(url);
    return data;
}

export { fetchRecent, fetchPopular, fetchUserSearch };