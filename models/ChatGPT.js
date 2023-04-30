const { GPTTools } = require('../utils')
const { OpenAPI, parseGPT } = GPTTools;

// DF: referes to a custom command (Data Format) we've built into the init function for the ChatGPT API it allows us to have no prompts and get raw data off GPT
const ChatGPT = { // will be renamed to GPT_Commands inside the ChatGPT model? 
    defineUserPreferences: () => "When recommending me recipes, make sure they're not any of these foods ${}",

    // foods
    generateFood: async () => {
        try {
            const res = await OpenAPI.command(`DF:create a food with values`);

            return parseGPT(res.data.choices[0].message.content);
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    generateFoodList: async qty => {
        try {
            const res = await OpenAPI.command(`DF:create a list of ${qty ? qty + " " : ""}recipies with values`);

            return parseGPT(res.data.choices[0].message.content);
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    // recipes
    generateRecipe: async () => {
        const res = await OpenAPI.command(`DF:create a recipe with values`);

        return parseGPT(res.choices[0].message.content);

    },

    generateRegionalRecipe: async (regon) => {
        const res = await OpenAPI.command(`DF:create a ${regon} themed recipe with values`);

        return parseGPT(res.choices[0].message.content);
    },

    generateRecipeList: async qty => {
        try {
            const res = await OpenAPI.command(`DF:create a list of ${qty ? qty + " " : ""}recipies with values`);

            return parseGPT(res.data.choices[0].message.content);
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    // recommendations
    generateRecommendedFood: () => `DF:to be determined`,
    generateRecommendedRecipe: qty => `DF:to be determined`,
}

module.exports = ChatGPT;