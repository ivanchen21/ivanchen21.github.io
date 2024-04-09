import { getAPOD } from "../controller/apod-controller.js";

// Display APOD image and text on homepage
const result = await getAPOD();

const apodBody = document.getElementById("apod-body");

if(result.media_type == "image"){
    apodBody.innerHTML = "<img src=\"" + result.picture + "\" alt=\"" + result.title + "\">"
}
else{   // Special Case - Use iframe tag for videos instead of img
    apodBody.innerHTML = `
        <iframe src="${result.picture}&autoplay=1&mute=1&loop=1" width="415" height="250"></iframe>
    `
}

const caption = document.getElementById("scrolling-text");
caption.innerHTML = result.caption;