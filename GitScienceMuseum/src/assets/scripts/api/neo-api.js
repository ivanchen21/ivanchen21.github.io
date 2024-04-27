import { NASA_API_KEY } from "../config.js";
import { fetchAPI } from "./fetch-api.js";

/* ------- NASA Asteroids - NeoWs API ------- */
// Near Earth Objects Web Service


// Fetch asteroids closest to Earth Today
async function fetchNEO() {
    const date = new Date();
    const today = date.toISOString().slice(0, 10);
    //console.log(today);

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;
    const data = await fetchAPI(url);
    //console.log(data);
    return data;
}

export { fetchNEO };