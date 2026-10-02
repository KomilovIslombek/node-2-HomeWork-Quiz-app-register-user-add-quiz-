import readline from "readline"
import fs from "fs"
import { readFile } from "fs/promises"

let app = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

app.question("New question: ", (question1) => {
    app.question("A): ", (answer_a) => {
        
        app.question("B): ", (answer_b) => {
            app.question("C): ", (answer_c) => {
                askCorrectAnswer(question1, answer_a, answer_b, answer_c);
            })
        })
    })
})

function askCorrectAnswer(question1, answer_a, answer_b, answer_c) {
    app.question("correct answer: ", async (correct_answer) => {
        if (correct_answer.toLowerCase() !== "a" && correct_answer.toLowerCase() !== "b" && correct_answer.toLowerCase() !== "c") {
            console.log("Please enter a valid answer (a, b, or c).");
            askCorrectAnswer(question1, answer_a, answer_b, answer_c);
        } else {
            let questionsRawData = await readFile("questions.json", "utf8");
            let questionsData = questionsRawData ? JSON.parse(questionsRawData) : [];
            let question_id = questionsData.at(-1)?.id + 1 || 1;

            let question = {
                id: question_id,
                question: question1,
                answers: {
                    a: answer_a,
                    b: answer_b,
                    c: answer_c
                },
                correct_answer: correct_answer.toLocaleLowerCase()
            }

            fs.readFile("questions.json", "utf8", (err, data) => {
                if (err && err.code !== "ENOENT") {
                    console.error(err);
                    return;
                }

                const questions = data ? JSON.parse(data) : [];
                questions.push(question);

                fs.writeFile("questions.json", JSON.stringify(questions, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    console.log("Question saved.")
                    app.close();
                });
            });
        }
    })
}