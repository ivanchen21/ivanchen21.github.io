import { fetchRecent } from "../api/nasa-library-api.js";

// recent info
async function getRecent() {
    const result = await fetchRecent();
    const data = {};

    data.title = result.collection.items[0].data[0].title;


    return data;
}

export { getRecent };