import { marked } from "marked";

async function test() {
    const input = "**Hello** World";
    try {
        const output = await marked.parse(input);
        console.log("Input:", input);
        console.log("Output:", output);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
