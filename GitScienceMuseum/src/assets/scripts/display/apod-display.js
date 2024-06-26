import { getAPOD } from "../controller/apod-controller.js";

async function displayAPOD() {
    // Display APOD image and text on homepage
    const result = await getAPOD();
    const apodBody = document.getElementById("apod-body");
    
    if(result.media_type == "image"){   // Use img tags for images
        apodBody.innerHTML = "<img src=\"" + result.picture + "\" alt=\"" + result.title + "\">"
    }
    else{   // Special Case - Use iframe tag for videos
        apodBody.innerHTML = `<iframe src="${result.picture}&autoplay=1&mute=1&loop=1"></iframe>`
    }
    const caption = document.getElementById("scrolling-text");
    const marquee = caption.querySelector(".scroll");
    marquee.innerHTML = result.caption;
}

export { displayAPOD };
