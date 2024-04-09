import { NASA_API_KEY } from "../config.js";

// Get today's APOD JSON from NASA API
export async function fetchAPOD() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    // URL for APOD videos (https://www.youtube.com/@APODVideos/videos)
    //const url = `https://api.nasa.gov/planetary/apod?api_key=h5gRoyD6NHDWX71M9tar8tQ0Mkma7cTVLuXf3NeX&date=2021-04-01`;
    const options = {
        method: 'GET',
    };
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    console.log(data);
    return data;
}