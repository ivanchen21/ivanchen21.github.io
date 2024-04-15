import { NASA_API_KEY } from "../config.js";
import { fetchAPI } from "./fetch-api.js";

/* ------- NASA APOD API ------- */

// Get today's APOD JSON
async function fetchAPOD() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    // URL for APOD videos (https://www.youtube.com/@APODVideos/videos)
    // const url = `https://api.nasa.gov/planetary/apod?api_key=h5gRoyD6NHDWX71M9tar8tQ0Mkma7cTVLuXf3NeX&date=2021-04-01`;

    const data = await fetchAPI(url);
    return data;
}

export { fetchAPOD };