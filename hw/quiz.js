import { createInterface } from "node:readline/promises"
import { stdin, stdout } from "node:process"
import { trimAndLowerCase } from "./helpers.js"
import { readFile } from "node:fs/promises"

const app = createInterface({
    input: stdin,
    output: stdout
})

async function checkUserExists() {
    let username = await app.question("Enter your username: ")
    let password = await app.question("Enter your password: ")

    username = trimAndLowerCase(username)
    password = trimAndLowerCase(password)

    let usersRawData = await readFile("data/users.json", "utf8");
    let usersData = usersRawData ? JSON.parse(usersRawData) : [];
    let user = usersData.find(user => user.username === username);    

    if(!user) {
        console.log("User not found. Please register first.");
        app.close();
        process.exit(1);
    } else if(user.password !== password) {
        console.log("Incorrect password. Please try again.");
        app.close();
        process.exit(1);
    }

    return user;
}

async function startQuiz() {

    const user = await checkUserExists();

    console.log(`Welcome ${user.username}! Let's start the quiz.`);

    const questionsRawData = await readFile("questions.json", "utf8");
    const questions = questionsRawData ? JSON.parse(questionsRawData) : [];
    let score = 0;
    let userAnswers = []

    for (const question of questions) {
        console.log(`\nQuestion: ${question.question}`);
        console.log(`A) ${question.answers.a}`);
        console.log(`B) ${question.answers.b}`);
        console.log(`C) ${question.answers.c}`);
        let answer = await app.question("Your answer (A, B, or C): ");
        answer = trimAndLowerCase(answer);
        
        let userAnswer = {
            // username: user.username,
            // question_id: question.id,
            question: question.question,
            you_answer: answer,
            correct_answer: question.correct_answer,
            status: `❌`,
            score: `${score}/${questions.length}`
        }
        if (answer === trimAndLowerCase(question.correct_answer)) {
            score++;
            userAnswer.score = `${score}/${questions.length}`
            userAnswer.status = `✅`
        }

        userAnswers.push(userAnswer)
    }
    
    console.log(`\nQuiz completed!`);
    console.table(userAnswers);
    app.close()
    process.exit(-1)
}

startQuiz()