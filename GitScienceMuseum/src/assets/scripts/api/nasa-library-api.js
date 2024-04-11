
/* ------- NASA Image and Video Library ------- */

// Get RECENT content
async function fetchRecent() {
    const url = `https://images-assets.nasa.gov/recent.json`;
    // https://images-api.nasa.gov/asset/?orderby=recent
    const options = {
        method: 'GET',
    };
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    return data;
}

async function fetchPopular() {
    const url = `https://images-assets.nasa.gov/popular.json`;
    // https://images-api.nasa.gov/asset/?orderby=popular
    const options = {
        method: 'GET',
    };
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    return data;
}

export { fetchRecent, fetchPopular };