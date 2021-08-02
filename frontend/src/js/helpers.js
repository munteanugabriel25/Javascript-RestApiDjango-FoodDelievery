import {REQUEST_TIMEOUT} from "./config.js"


async function getJSON(url){
    try{
        const response = await Promise.race([fetch(url)], timeout(REQUEST_TIMEOUT));
        const data = await response.json();
        if(!response.ok) throw new Error(`${response.status} ${data.message}`);
        return data;
    }
    catch(error){
        throw error;
    }
}


const timeout = function(seconds){
    return new Promise(function( _ ,reject){
        setTimeout(function(){
            reject(new Error(`Request took too long ! Request timeout ${seconds}`));
        },seconds*1000);
    })
}