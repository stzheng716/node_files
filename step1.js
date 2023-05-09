"use strict";

const fsP = require("fs/promises");

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

cat(path)