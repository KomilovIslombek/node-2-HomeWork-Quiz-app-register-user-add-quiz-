/*
// Common js and ES module review

// This is the syntaxes for Common JS module
// const { add } = require('./utils.cjs');

// const result = add(2, 3); // 5  
console.log(result);

// Now let's see the ES module syntax
// import { plus as newPlus , subtract } from './utils.mjs';
// import { plus } from './utils.mjs';

console.log({ subtract, newPlus });

// const result1 = newPlus(2, 3);
console.log(result1);

// const result2 = subtract(5, 2);
console.log(result2);


// WHat is the difference between Common JS and ES module?
// Common JS is synchronous and ES module is asynchronous. 
// Common JS is used in Node.js and ES module is used in the browser. 
// Common JS uses require() and module.exports, while ES module uses import and export. 
// Common JS can be used in Node.js, while ES module can be used in both Node.js and the browser.

// explain the difference between Common JS and ES module in a simple way
// Common JS and ES modules are two different ways to handle modules in JavaScript.
// Common JS is synchronous and ES module is asynchronous. -- give example
// Common JS is used in Node.js and ES module is used in the browser. -- give example
// Common JS uses require() and module.exports, while ES module uses import and export. -- give example
// Common JS can be used in Node.js, while ES module can be used in both Node.js and the browser. -- give example

// let's take a look at the difference between Common JS and ES module in a simple way with examples
// Common JS is synchronous and ES module is asynchronous. 
// For example, in Common JS, you can use require() to load a module synchronously, while in ES module, you can use import to load a module asynchronously.
// write the example code for the above statement
// Common JS example
// const { add } = require('./utils.cjs');
// const result = add(2, 3); // 5  
console.log(result);
//  how to understand that it is synchronous?
// In Common JS, the require() function is synchronous, meaning that it blocks the execution of the code until the module is loaded. 
// This means that the code will not continue to execute until the module is fully loaded and available for use. 
// For example, if you have a large module that takes a long time to load, the code will be blocked until the module is fully loaded, which can lead to performance issues.
// show the example code for the above statement
// Common JS example
// console.log('Before loading the module');
const { add } = require('./utils.cjs');

// wait for the module to load
const result = add(2, 3);
// and then print the result, then gets printed after the module is loaded
// finally we've got the after loading the module printed after the result is printed
// console.log(result); // 5
// console.log('After loading the module');
 
// how will the above code be executed?
// The above code will be executed in the following order:
// 1. 'Before loading the module' will be printed to the console.
// 2. The module will be loaded synchronously.
// 3. The result will be calculated and printed.
// 4. 'After loading the module' will be printed to the console.

// how will the above code be executed if it was an ES module?
// In an ES module, the code will be executed in the following order:
// 1. 'Before loading the module' will be printed to the console.
// 2. The module will be loaded asynchronously.
// 3. The result will be calculated and printed.
// 4. 'After loading the module' will be printed to the console.

// so what's the difference between the above two code snippets? 
// The difference between the above two code snippets is that in the Common JS example, the module is loaded synchronously, meaning that the code will not continue to execute until the module is fully loaded.
// In the ES module example, the module is loaded asynchronously, meaning that the code will continue to execute while the module is being loaded. 
// This means that the 'After loading the module' message will be printed before the result is calculated and printed. 
// This can lead to performance issues if the module takes a long time to load, as the code will continue to execute while waiting for the module to load.
// but here's the thing, in the ES module example, the 'After loading the module' message will be printed before the result is calculated and printed.
// here we don't see the different because the module is small and loads quickly, but if the module was large and took a long time to load, we would see the difference in the order of execution.
// let's make it large and see the difference in the order of execution.
// how can we do that? we can create a large module that takes a long time to load.
// do we need to install via npm? no, we can create a large module ourselves.
// then create a large module that takes a long time to load in the utils.cjs file.
*/


// We'll see the built-in modules in Node.js, such as fs, path, http, etc.

import path from 'path';

// this function will resolve the path of the index.js file in the current directory
const resolvedPath = path.resolve('index.js'); // C:\n6-fullstack\learning-backend\month-5\node-2\index.js
// console.log(resolvedPath);

// this function displays the different parts of the path, such as root, dir, base, ext, and name
const parsedPath = path.parse(resolvedPath); // { root: 'C:\\', dir: 'C:\\n6-fullstack\\learning-backend\\month-5\\node-2', base: 'index.js', ext: '.js', name: 'index' }
// console.log(parsedPath);

const joinedPath = path.join('folder1', 'folder2', 'file.txt'); // folder1\folder2\file.txt
// console.log(joinedPath);

// this function will check if the path is absolute or relative
// what's absoulte and relative path? Absolute path is the full path to a file or directory, while relative path is the path relative to the current working directory. for example, if the current working directory is C:\n6-fullstack\learning-backend\month-5\node-2, then the absolute path to index.js is C:\n6-fullstack\learning-backend\month-5\node-2\index.js, while the relative path to index.js is index.js.
// console.log(path.isAbsolute(resolvedPath)); // true

const normalizedPath = path.normalize('C:\\n6-fullstack\\learning-backend\\month-5\\node-2\\..\\index.js'); // C:\n6-fullstack\learning-backend\month-5\index.js
// console.log(normalizedPath);

// console.log(path.extname(resolvedPath)); // .js
// console.log(path.basename(resolvedPath)); // index.js


// Now we'll see the fs module, which is used to work with the file system in Node.js. It allows us to read, write, and manipulate files and directories.

import fs from 'fs';

if(fs.existsSync('./utils.mjs')) {
    fs.readFile('./utils.mjs', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        return;
        }
    console.log(data);
    })
}

// fs.writeFile('hw.txt', 'Hello World from Node.js!', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File written successfully!');
// })

// fs.appendFile('hw.txt', '\nHello again from Node.js!', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File appended successfully!');
// })

// fs.unlink('hw.txt', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File deleted successfully!');
// })

// fs.rename('utils.mjs', 'utils.js', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File renamed successfully!');
// })

if(!fs.existsSync('new-folder')) {
    fs.mkdir('new-folder', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Folder created successfully!');
    });
}

if(!fs.existsSync('new-folder/src')) {
    fs.mkdir('new-folder/src', (err) => {
        if (err) {
            console.error(err);
            return;
        }   
        console.log('Folder created successfully!');
    })

}

if(!fs.existsSync('new-folder/src/new-file.txt')) {
    fs.writeFile('new-folder/src/new-file.txt', 'Hello World from Node.js!', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File written successfully!');
    })
}

// fs.readdir('new-folder/src', (err, files) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Files in directory:', files);
// })


// Now os module, which is used to get information about the operating system in Node.js. It allows us to get information such as the OS type, platform, architecture, etc.

import os from 'os';

console.log(os.platform()) // 'win32'
console.log(os.type()) // 'Windows_NT'
console.log(os.version()) // '10.0.19045'
console.log(os.arch()) // 'x64'
console.log(os.cpus()) // [ { model: 'Intel(R) Core(TM) i7-10750H CPU @ 2.60GHz', speed: 2601, times: { user: 123456, nice: 0, sys: 123456, idle: 123456, irq: 0 } }, ... ]
console.log(bytesToSize(os.freemem())) // 17179869184
console.log(bytesToSize(os.totalmem())) // 34359738368

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

