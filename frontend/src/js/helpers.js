import {REQUEST_TIMEOUT} from "./config.js"


export async function getJSON(url, token){
    try{
        const response = await Promise.race([fetch(url), timeout(REQUEST_TIMEOUT)]);
        const data = await response.json();
        if(!response.ok) throw new Error(`${response.status} ${data.message}`);
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function postJSON(url, tokenKey="", object){
    try {
        const response = await Promise.race([fetch(url,{
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify(object)
        }),timeout(REQUEST_TIMEOUT)]);
        console.log(response)
        const data = await response.json();
        if(!response.ok) throw new Error("Something went wrong loging");
        return data;

    }catch(error){
        console.error(error)
    }
}

const timeout = function(seconds){
    return new Promise(function( _ ,reject){
        setTimeout(function(){
            reject(new Error(`Request took too long ! Request timeout ${seconds}`));
        },seconds*1000);
    })
}
const getCSRFToken= function(){
    const [,cookie] = String(document.cookie).split("=");
        return cookie
}