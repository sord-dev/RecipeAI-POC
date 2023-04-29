require('dotenv').config();
const fs = require('fs');
const prefix = fs.readFileSync(__dirname + '/prefix.txt').toString(); // gpt prefix file to establish foods, recipes and the dataformat command 
const { Configuration, OpenAIApi } = require('openai');

// openai setup for and helper functions for ChatGPT
const config = new Configuration({ apiKey: process.env.OPEN_AI_API_KEY })
const OpenAPI = new OpenAIApi(config);

OpenAPI.command = async (content) => { // helper command to easily command gpt
    let cmd = { role: "user", content: prefix + ' ' + content };
    const res = await OpenAPI.createChatCompletion({ model: 'gpt-3.5-turbo', messages: [cmd] });

    return res.data;
}

module.exports.OpenAPI = OpenAPI;
module.exports.parseGPT = require('./parseGPT');
