import { NASA_API_KEY } from "../config.js";


/* ------- NASA Image and Video Library ------- */

// Get RECENT content
async function fetchRecent() {
    const url = `https://images-assets.nasa.gov/recent.json?api_key=${NASA_API_KEY}`;
    // https://images-api.nasa.gov/asset/?api_key=${NASA_API_KEY}&orderby=recent
    const options = {
        method: 'GET',
    };
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    return data;
}

export { fetchRecent };