import { getRecent } from "../controller/nasa-library-search.js";

async function displayRecent() {
    const result = await getRecent();
    const content = document.getElementById("media-container");

    console.log(result);
    var n = result.length;

    
    // for(let i = 0; i < n; i++){
    //     content.innerHTML += result[i].title;
    //     content.innerHTML += "<br>";
    //     content.innerHTML += result[i].image;
    //     content.innerHTML += "<br>";
    //     content.innerHTML += result[i].photographer;
    //     content.innerHTML += "<br>";
    //     content.innerHTML += result[i].nasa_id;
    //     content.innerHTML += "<br>";
    //     content.innerHTML += result[i].media_type;
    //     content.innerHTML += "<br>";
    //     if(result[i].keyword){
    //         for(let j = 0; j < result[i].keyword.length; j++){
    //             content.innerHTML += result[i].keyword[j];
    //         }
    //     }
    //     content.innerHTML += "<br>";
    //     content.innerHTML += "<hr>";


    content.innerHTML += `
        <div class="media">
            <h3>${result.items[0].title}</h3>
            <div class="grid">

                <div class="item">
                    <img>
                    <div>description info</div>
                    <div>${result.items[0].photographer}</div>
                </div>
                <div class="item">
                    <img>
                    <div>description info</div>
                    <div>${result.items[1].photographer}</div>
                </div>
                <div class="item">
                    <img>
                    <div>description info</div>
                    <div>${result.items[2].photographer}</div>
                </div>

            </div>
        </div>
    `
}

export { displayRecent };
