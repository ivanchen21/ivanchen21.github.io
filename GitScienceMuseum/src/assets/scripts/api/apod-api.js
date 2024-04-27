import { NASA_API_KEY } from "../config.js";
import { fetchAPI } from "./fetch-api.js";


/* ------- NASA APOD API ------- */

function getRandomDate() {
    const start = new Date("1995-06-16");
    const end = new Date();

    const random_date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    //console.log(randomDate);

    return random_date.toISOString().slice(0, 10);
}

// APOD videos (https://www.youtube.com/@APODVideos/videos)
// Get APOD JSON
async function fetchAPOD() {
    // Default - Today's APOD
    //const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

    //const url = `https://api.nasa.gov/planetary/apod?api_key=h5gRoyD6NHDWX71M9tar8tQ0Mkma7cTVLuXf3NeX&date=2021-04-01`;

    // Random APOD (1995-06-16 to Today)
    const random_date = getRandomDate();
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${random_date}`;
    const data = await fetchAPI(url);
    return data;
}

export { fetchAPOD };