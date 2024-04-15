import { getRecent, getUserSearch } from "../controller/nasa-library-search.js";

function displayNews(result){
    console.log(result);
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
                <div class="grid">

                </div>
            </div>
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
                    <section>
                        <p>${obj.groups[i][j].description}</p>
                        <div>${obj.groups[i][j].photographer}</div>
                    </section>
                </div>
            `
        }
    }

}

function displayExtras(obj){
    const content = document.getElementById("media");
    // Display extra media separated
    if(obj.extras.length){
        content.innerHTML +=`
            <div id="extras-container" class="row">

            </div>
        `
    }

    var column_counter = 0;
    for(let i = 0; i < obj.extras.length; i++){
        var extras_container = document.getElementById("extras-container");
        extras_container.innerHTML +=`
            <div class="item-content col-2">
                <div>
                    <img src="${obj.extras[i].image}" alt="image for ${obj.extras[i].title}">
                </div>
            </div>
        `
        column_counter++;
        if(column_counter % 6 == 0){
            column_counter = 0;
        }
    }
}

async function displayRecent() {
    const result = await getRecent();
    displayNews(result);
}


async function displayUserSearch(input){
    const result = await getUserSearch(input);
    displayNews(result);
}

export { displayRecent, displayUserSearch };
