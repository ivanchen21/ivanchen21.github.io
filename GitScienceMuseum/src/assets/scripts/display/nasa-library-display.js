import { getRecent } from "../controller/nasa-library-search.js";

async function displayRecent() {
    const result = await getRecent();
    const apodBody = document.getElementById("content-container");
    apodBody.innerHTML = result.title;
}

export { displayRecent };
