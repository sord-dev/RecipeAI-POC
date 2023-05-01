const { GPTTools } = require('../utils')
const { OpenAPI, parseGPT } = GPTTools;

// DF: in some command prompts referes to a custom command (Data Format)
// We've built into the init function for the ChatGPT API it allows us to have no prompts and get raw data off GPT.

const ChatGPT = { // will be renamed to GPT_Commands inside the ChatGPT model? 
    // recommendations
    generateRecipeU: async (user) => {
        const res = await OpenAPI.command(`${user.statePreferences()} DF:create a recipe object list with 2 entries from these ingredients with values no summary`);

        return parseGPT(res.choices[0].message.content);
    },

    // poc recipes
    generateRecipe: async (preferences) => {
        console.log(preferences ? `${preferences} DF:create a recipe with values` : `DF:create a recipe with values`)
        const res = await OpenAPI.command(preferences ? `${preferences} DF:create a recipe with values` : `DF:create a recipe with values`);

        return parseGPT(res.choices[0].message.content);
    },

    generateRegionalRecipe: async (region) => {
        const res = await OpenAPI.command(`DF:create a ${region} recipe with values`);

        return parseGPT(res.choices[0].message.content);
    },
}

module.exports = ChatGPT;