import { fetchAPOD } from "../api/apod-api.js";

// Get title, image, explanation from JSON
async function getAPOD() {
    const result = await fetchAPOD();
    const data = {};

    data.title = result.title;
    data.picture = result.url;          // APOD url can be image or video
    data.caption = result.explanation;
    data.media_type = result.media_type;

    return data;
}

export { getAPOD };