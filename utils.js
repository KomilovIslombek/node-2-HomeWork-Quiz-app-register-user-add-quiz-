import fs from 'fs';

const subtract = (a, b) => a - b;
const plus = (a, b) => a + b;

export {subtract, plus};


function createFile(fileName, content, directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    fs.writeFileSync(`${directory}/${fileName}`, JSON.stringify(content, null, 2));
    console.log(`File ${fileName} created successfully!`);
}

createFile('hw.txt', {}, './hw')