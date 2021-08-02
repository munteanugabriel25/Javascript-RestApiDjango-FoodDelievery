import {getJSON} from "./helpers.js"
import {URL_API} from "./config.js"


export const state = {
    item : {},
}



export const loadItem = async function(id) {
    try {
        const data = await getJSON(`${URL_API}/${id}`)
        console.log(data)
        
    }
    catch(error){
        console.error(error)
    }
}