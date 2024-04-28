import { getRecent, getPopular, getUserSearch, getNewsDetails } from "../controller/nasa-library-search.js";
import { fetchHref } from "../api/fetch-api.js";

function displayNews(result){
    // console.log(result);

    // HTML for No Results
    if(result.groups.length == 0 && result.extras.length == 0){
        const content = document.getElementById("media");
        content.innerHTML = `
            <div class="results">
                <h2>Sorry, we could not find any results.</h2>
            </div>
        `
        return;
    }
    displayTopics(result);
    displayExtras(result);
}

function displayTopics(obj){
    const content = document.getElementById("media");
    content.innerHTML = '';

    var news_id = 0;
    var item_id = 0;

    // Display Media with shared titles first
    for(let i = 0; i < obj.titles.length; i++) {
        content.innerHTML +=`
            <div id="news-${news_id++}" class="news-group">
                <h2>${obj.titles[i].title}</h2>
                <hr>
                <div class="grid">

                </div>
            </div>
            <br>
        `

        for(let j = 0; j < obj.groups[i].length; j++){
            var news_container_id = `news-${news_id - 1}`;
            var news_container = document.getElementById(news_container_id);
            var grid_container = news_container.querySelector(".grid");

            grid_container.innerHTML +=`
                <a href="news-details.html?nasa_id=${encodeURIComponent(obj.groups[i][j].nasa_id)}" class="item-${item_id++} item-content">
                    <div id="${obj.groups[i][j].nasa_id}">
                        <img src="${obj.groups[i][j].image}" alt="image for ${obj.groups[i][j].title}">
                    </div>
                </a>
            `
        }
    }
}

// Display extra media separately using bootstrap + masonry
function displayExtras(obj){
    const content = document.getElementById("media");
    if(obj.extras.length){
        content.innerHTML +=`
            <div id="extras-container" class="row g-0" data-masonry='{"percentPosition": true }'>
                <center><h1 class="playfair-font"><b>Gallery</b></h1></center>
            </div>
        `
        var extras_container = document.getElementById("extras-container");

        var num_of_columns = 4;
        var column_id = 0;

        // Create X amount of columns
        for(let i = 0; i < num_of_columns; i++){
            extras_container.innerHTML +=`
                <div id="column-${i}" class="col-3">
                
                </div>
            `
        }
        

        column_id = 0;

        for(let i = 0; i < obj.extras.length; i++){
            var column = `column-${column_id++}`
            var column_container = document.getElementById(column);

            // Provide text for imageless audio
            var image;
            if(obj.extras[i].media_type != "audio"){
                image = '';
            }
            else{
                image = `<i>${obj.extras[i].title}</i>`; 
            }

            column_container.innerHTML +=`
                <div class="item-content">
                    <a href="news-details.html?nasa_id=${encodeURIComponent(obj.extras[i].nasa_id)}">
                        <div id="${obj.extras[i].nasa_id}">
                            <img src="${obj.extras[i].image}" alt="image for ${obj.extras[i].title}">
                            ${image}
                        </div>
                    </a>
                </div>
            `

            if(column_id >= num_of_columns){
                column_id = 0;
            }
        } 
    }
}






async function displayRecent() {
    const result = await getRecent();
    displayNews(result);
}

async function displayPopular() {
    const result = await getPopular();
    displayNews(result);
}

async function displayUserSearch(input){
    const result = await getUserSearch(input);
    displayNews(result);
}


// Passes data to different page using url parameter
async function displayNewsDetails(nasa_id){
    const result = await getNewsDetails(nasa_id);
    // console.log(result);

    // Check if access is denied on assets
    await fetchHref(result.href);

    const piece = document.getElementById("art-piece");
    const picture = piece.querySelector(".frame");

    if(result.media_type == "image"){
        picture.innerHTML = `
            <img src="${result.href}" alt="${result.title}" />
        `
    }
    if(result.media_type == "video"){
        picture.innerHTML = `
            <video width="100%" controls muted>
                <source src="${result.href}">
                Your browser does not support the video tag.
            </video>
        `
    }
    if(result.media_type == "audio"){
        picture.innerHTML = `
            <video width="100%" controls muted>
                <source src="${result.href}">
                Your browser does not support the video tag.
            </video>
        `
    }

    const label = document.getElementById("art-label");
    const plaque = label.querySelector(".plaque");
    plaque.innerHTML =`${result.title}`

    const text_content = document.getElementById("text-content");
    const desc = text_content.querySelector(".art-description");
    const text1 = text_content.querySelector(".text1");
    const text2 = text_content.querySelector(".text2");

    const date = new Date(result.date_created);
    date.setDate(date.getDate() + 1);

    desc.innerHTML = `${result.description}`

    text1.innerHTML = `<div><b>- ${result.photographer}</b></div>`

    text2.innerHTML = `
        <div>${date.toLocaleDateString()}</div>
        <div>${result.center}</div>
    `
    if(result.keywords.length > 0){
        text2.innerHTML += `<div class="keywords"><br></div>`
        var keywords = text2.querySelector(".keywords");
        
        for(let i = 0; i < result.keywords.length - 1; i++){
            keywords.innerHTML += `${result.keywords[i]}, `
        }
        keywords.innerHTML += `${result.keywords[result.keywords.length - 1]}`
    }
}

export { displayRecent, displayPopular, displayUserSearch, displayNewsDetails };
