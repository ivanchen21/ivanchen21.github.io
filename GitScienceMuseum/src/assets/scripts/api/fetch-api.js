async function fetchAPI(url) {
    try {
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);

        // HTTP Status Codes
        if(!response.ok) {
            if(response.status == 400){
                throw new Error("400 - Bad Request, missing parameter.");
            }
            if(response.status == 403) {
                throw new Error("403 - Forbidden, access denied.");
            }
            if(response.status == 404) {
                throw new Error("404 - Not Found, resource does not exist.");
            }
            if(response.status == 500 || response.status == 502 || response.status == 503 || response.status == 504) {
                throw new Error("5XX - Server error, something wrong on API's end.");
            }
        }
        const result = await response.text();
        const data = JSON.parse(result);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function fetchHref(url) {
    try {
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);
        // HTTP Status Codes
        if(!response.ok) {
            if(response.status == 400){
                throw new Error("400 - Bad Request, missing parameter.");
            }
            if(response.status == 403) {
                throw new Error("403 - Forbidden, access denied.");
            }
            if(response.status == 404) {
                throw new Error("404 - Not Found, resource does not exist.");
            }
            if(response.status == 500 || response.status == 502 || response.status == 503 || response.status == 504) {
                throw new Error("5XX - Server error, something wrong on API's end.");
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export { fetchAPI, fetchHref };