import { fetchRecent, fetchPopular, fetchUserSearch, fetchByNasaID, fetchAsset } from "../api/nasa-library-api.js";

// title, image, nasa_id, media_type
// For displaying general information
function processObjectData(obj){
    let result = {};
    result.titles = [];
    result.items = [];

    // Number of items
    var n = obj.collection.items.length;

    var title_id = -1;

    for (let i = 0; i < n; i++) {
        let temp = {};
        temp.group = -1;

        // Ensure key exists before assigning
        if(obj.collection.items[i].data[0].title)
            temp.title = obj.collection.items[i].data[0].title;

        // Group similar news using title_id
        var checker = false;
        for(let i = 0; i < result.titles.length; i++){
            if(temp.title == result.titles[i].title){
                temp.group = i;
                result.titles[i].quantity++;
                checker = true;
                break;
            }
        }
        // If no title matches, store new title
        if(!checker){
            result.titles[++title_id] = {
                title_id: title_id,
                title: temp.title,      // unique title
                quantity: 1             // number of items that share that title
            };
            temp.group = title_id;
        }

        if(obj.collection.items[i].data[0].media_type){
            temp.media_type = obj.collection.items[i].data[0].media_type;
        } else temp.media_type = "N/A";

        // Check if object exists or is undefined
        if(temp.media_type != "audio") {
            if(obj.collection.items[i].links[0].href){
                temp.image = obj.collection.items[i].links[0].href;
            } 
            else temp.image = "N/A";
        }
        else{
            temp.image = "../assets/images/audio-nasa.jpeg";
        }

        if(obj.collection.items[i].data[0].nasa_id){
            temp.nasa_id = obj.collection.items[i].data[0].nasa_id;
        } else temp.nasa_id = "N/A";

        result.items[i] = temp;
    }
    //console.log(result);
    return result;
}

// Rearrange object
// Restructure object: Group unique titles together, shared titles together
function refineObjectData(obj){
    var restructured_data = {};
    restructured_data.titles = [];
    restructured_data.groups = [];
    restructured_data.extras = [];

    // Remove elements from data.titles[] that do not share a title
    restructured_data.titles = obj.titles.filter(title => title.quantity > 1);

    // Group items that share the same title
    for(let i = 0; i < restructured_data.titles.length; i++){
        let temp = obj.items.filter(item => item.group == restructured_data.titles[i].title_id);
        restructured_data.groups[i] = temp;
    }

    // Group items that have a unique title
    var unique_titles_array = [];
    unique_titles_array = obj.titles.filter(title => title.quantity == 1);

    for(let i = 0; i < obj.items.length; i++){
        for(let j = 0; j < unique_titles_array.length; j++){
            if(obj.items[i].group == unique_titles_array[j].title_id){
                restructured_data.extras.push(obj.items[i]);
                break;
            }
        }
    }
    
    return restructured_data;
}

// Get the search filter inputs as object
function getQueryParameters(query, filter){
    var data = {};

    if (query[0].value.trim() != "") {
        data.q = query[0].value;
    }
    else{
        data.q = "";    //Empty q parameter gives news alphabetically (audio type first)
    }

    var image_box = filter[0].checked;
    var video_box = filter[1].checked;
    var audio_box = filter[2].checked;

    if(image_box && video_box  && audio_box){
        data.media_type = "image,video,audio";
    }
    else if((!image_box && !video_box  && !audio_box)){
        data.media_type = "";
    }
    else if(image_box && !video_box && !audio_box){
        data.media_type = "image";
    }
    else if(!image_box && video_box && !audio_box){
        data.media_type = "video";
    }
    else if(!image_box && !video_box && audio_box){
        data.media_type = "audio";
    }
    else if(image_box && video_box && !audio_box){
        data.media_type = "image,video";
    }
    else if(image_box && !video_box && audio_box){
        data.media_type = "image,audio";
    }
    else if(!image_box && video_box && audio_box){
        data.media_type = "video,audio";
    }

    data.page_size = filter[3].value;

    let start = filter[4].value;
    let end = filter[5].value;
    if(end < start){
        let temp = start;
        start = end;
        end = temp;
    }
    data.year_start = start;
    data.year_end = end;

    //console.log(data);
    return data;
}

// fetch API -> Get specific data -> Pass info to display function
async function getRecent() {
    const result = await fetchRecent();
    const data = processObjectData(result);
    const refined_data = refineObjectData(data);

    return refined_data;
}
async function getPopular() {
    const result = await fetchPopular();
    const data = processObjectData(result);
    const refined_data = refineObjectData(data);

    return refined_data;
}
async function getUserSearch(input){
    const result = await fetchUserSearch(input);
    const data = processObjectData(result);
    const refined_data = refineObjectData(data);

    return refined_data;
}

// Get detailed data for news-details.html page
// title, media_type, image, description, photographer, nasa_id, keywords, date_created, center
async function getNewsDetails(nasa_id){
    const obj = await fetchByNasaID(nasa_id);
    let result = {};

    // Searching by nasa_id can still fetch more than one item!!!
    var n = obj.collection.items.length;

    if(n != 0){
        let temp = {};

        if(obj.collection.items[0].data[0].title) {
            temp.title = obj.collection.items[0].data[0].title;
        }

        if(obj.collection.items[0].data[0].media_type){
            temp.media_type = obj.collection.items[0].data[0].media_type;
        } else temp.media_type = "N/A";



        
        // Get either image, audio, or video file by calling assets api
        // https://images-api.nasa.gov/asset/{nasa_id}
        const asset_obj = await fetchAsset(nasa_id);
        let number_of_assets = asset_obj.collection.items.length;

        if (number_of_assets > 0) {
            for (let i = 0; i < number_of_assets; i++) {
                let href = asset_obj.collection.items[i].href;

                if (temp.media_type == "image" && (href.includes('.jpg') || href.includes('.png') || href.includes('.jpeg'))) {
                    temp.href = href;
                    break;
                }
                if (temp.media_type == "video" && href.includes('.mp4')) {
                    temp.href = href;
                    break;
                }
                if (temp.media_type == "audio" && (href.includes('.mp3') || href.includes('.wav') || href.includes('.mp4'))) {
                    temp.href = href;
                    break;
                }
            }
        } else temp.href = "N/A";




        if(obj.collection.items[0].data[0].description){
            temp.description = obj.collection.items[0].data[0].description;
        } else temp.description = "N/A";

        if(obj.collection.items[0].data[0].photographer){
            temp.photographer = obj.collection.items[0].data[0].photographer;
        } else temp.photographer = "N/A";

        if(obj.collection.items[0].data[0].nasa_id){
            temp.nasa_id = obj.collection.items[0].data[0].nasa_id;
        } else temp.nasa_id = "N/A";

        if(obj.collection.items[0].data[0].center){
            temp.center = obj.collection.items[0].data[0].center;
        } else temp.center = "N/A";

        if(obj.collection.items[0].data[0].date_created){
            temp.date_created = obj.collection.items[0].data[0].date_created;
        } else temp.date_created = "N/A";
            

        if(obj.collection.items[0].data[0].keywords) {
            var m = obj.collection.items[0].data[0].keywords.length;
            temp.keywords = [];
            for(let j = 0; j < m; j++){
                temp.keywords[j] = obj.collection.items[0].data[0].keywords[j];
            }
        } else temp.keywords = ["N/A"];

        result = temp;
    }
    else {
        console.log("No items to fetch.")
    }
    //console.log(result);
    return result;
}


export { getRecent, getPopular, getUserSearch, getQueryParameters, getNewsDetails };