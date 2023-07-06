import openai from "./config/openai.js";
import readlinesync from "readline-sync";
import colors from "colors";

async function main() {
  const chatHistory = [];
  while (true) {
    const userInput = readlinesync.question(colors.bold.yellow("You: "));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: "user", content: userInput });

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      // getting completion text
      const completionText = completion.data.choices[0].message.content;
      if (userInput.toLowerCase() === "exit") {
        return;
      }
      console.log(colors.bold.green("Bot: " + completionText));
      messages.push({ role: "assistant", content: completionText });
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.log(colors.bold.red("Error: " + error));
    }
  }
}

main();
