import { getRecent, getPopular, getUserSearch } from "../controller/nasa-library-search.js";

function displayNews(result){
    //console.log(result);

    // HTML for No Results
    if(result.groups.length == 0 && result.extras.length == 0){
        const content = document.getElementById("media");
        content.innerHTML = "No Results";
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
                <div class="item-${item_id++} item-content">
                    <div>
                    <img src="${obj.groups[i][j].image}" alt="image for ${obj.groups[i][j].title}">
                    </div>


                </div>
            `
        }
    }
                    // <section>
                    //     <p>${obj.groups[i][j].description}</p>
                    //     <div><b>${obj.groups[i][j].photographer}</b></div>
                    // </section>
}

// Display extra media separately using bootstrap + masonry
function displayExtras(obj){
    const content = document.getElementById("media");
    if(obj.extras.length){
        content.innerHTML +=`
            <div id="extras-container" class="row g-0" data-masonry='{"percentPosition": true }'>
                <center><h1><b>Gallery</b></h1></center>
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
            column_container.innerHTML +=`
                <div class="item-content">
                    <div>
                        <img src="${obj.extras[i].image}" alt="image for ${obj.extras[i].title}">
                    </div>
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

export { displayRecent, displayPopular, displayUserSearch };
