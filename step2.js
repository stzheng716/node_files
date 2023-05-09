"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

const path = process.argv[2]

/**console logs the contents of a given file path or console.log error and 
 * exits program */

async function cat(path){
    let content;

    try {
        content = await fsP.readFile(path, "utf-8");
    } catch (err) {
        console.log("Error reading", path)
        console.log("Error:", err)
        process.exit(1)
    }
    console.log(content)
}

/**console logs the contents of a given file path or URL, if error is thrown 
 * console log errors and  exits program*/

async function webCat(path){
    let response;
    try {
        response = await axios.get(path);
    } catch (err) {
        console.log("Error fetching", path)
        console.log("Error:", err)
        process.exit(1)
    }
    console.log(response.data.slice(0,20), "...")
}

if (path.startsWith("http://")){
    webCat(path)
} else {
    cat(path)
}