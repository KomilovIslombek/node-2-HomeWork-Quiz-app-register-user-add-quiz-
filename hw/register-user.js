import { createInterface } from "node:readline/promises";
import process from "node:process";
import fs from "node:fs/promises";
import { checkFileExists, checkPathExists } from "./helpers.js";


const app = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function registerUser() {
    if(!await checkPathExists("data")) {
        console.log("Creating data folder...");
        await fs.mkdir("data");
    }
    if(!await checkFileExists("data/users.json")) {
        console.log("Creating users.json file...");
        await fs.writeFile("data/users.json", "[]");
    }

    const usersData = await fs.readFile("data/users.json", "utf8");
    const users = JSON.parse(usersData) || [];
    
    let username = await app.question("Enter your username: ");
    if(users.some(user => user.username === revertToLowerCase(username))) {
        console.log("Username already exists. Please choose a different username.");
        username = await askUsername(username, users);   
    }
    const password = await app.question("Enter your password: ");


    const user = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        username: revertToLowerCase(username),
        password: password
    };

    users.push(user);
    await fs.writeFile("data/users.json", JSON.stringify(users, null, 2));
    console.log(`Now ${user.username} can participate in our quiz game!`);
    app.close();
}

async function askUsername(username, users) {
    let newUsername = await app.question("Enter your username: ");
    if(checkUsernameExists(newUsername, users)) {
        console.log("Username already exists. Please choose a different username.");
        return await askUsername(username, users);
    }
    return newUsername;
}

function checkUsernameExists(username, users) {
    return users.some(user => user.username === username);
}

function revertToLowerCase(str) {
    return str.trim().toLowerCase().replaceAll(' ', '');
}

registerUser();