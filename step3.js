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

/**takes a path and file name, read the file of path and write to a new file 
 * with file name or return error if path doesn't exist  */

async function catWrite(path, fileName){
    try {
        let content = await fsP.readFile(path, "utf-8");
        await fsP.writeFile(fileName, content, "utf8")
    } catch (err) {
        console.error("Couldn't write", fileName)
        console.error("Error:", `${err}`)
        process.exit(1)
    }
    console.log(`no output, but ${fileName} contains contents of ${path}`)
}


/**console logs the contents of a given file path or URL, if error is thrown 
 * console log errors and  exits program*/

async function webCat(url){
    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        console.error("Error fetching", url)
        console.error("Error:", err)
        process.exit(1)
    }
    console.log(response.data.slice(0,20), "...")
}

/**takes a url and file name, read the file of path and write to a new file 
 * with file name or return error if url doesn't with 404 */

async function webCatWrite(url, fileName){

    const urlObj = new URL(url)
    let response; 

    try {
        response = await axios.get(urlObj.origin);
    } catch (err) {
        console.error("Error fetching", url)
        console.error(`Error: ${err}`)
        process.exit(1)
    }

    const hostname = urlObj.hostname.replace(".com", "")
    await fsP.writeFile(fileName, response.data, "utf8")
    console.log(`no output, but ${fileName} contains contents of ${hostname}'s HTML`)
}


if (path === "--out"){
    const newFileName = process.argv[3]
    const readPath = process.argv[4]

    if(readPath.startsWith("http://")) {
        webCatWrite(readPath, newFileName)
    } else {
        catWrite(readPath, newFileName)
    }
} else if(path.startsWith("http://")) {
    webCat(path)
} else {
    cat(path)
}