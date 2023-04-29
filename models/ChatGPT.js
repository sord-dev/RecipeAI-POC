const { GPTTools } = require('../utils')
const { OpenAPI, parseGPT } = GPTTools;

// DF: referes to a custom command (Data Format) we've built into the init function for the ChatGPT API it allows us to have no prompts and get raw data off GPT
const ChatGPT = { // will be renamed to GPT_Commands inside the ChatGPT model? 
    initUser: () => "When recommending me recipes, make sure they're not any of these foods ${}",

    // foods
    generateFood: async () => {
        try {
            const res = await OpenAPI.command(`DF:create a food with values`);
            
            parseGPT(res.data.choices[0].message.content);
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    generateFoodList: async qty =>  parseGPT(await OpenAPI.command(`DF:create a list of ${qty ? qty + " " : ""}foods with values`)),

    // recipes
    generateRecipe: async () => {
        try {
            const res = await OpenAPI.command(`DF:create a recipe with values`);

            return parseGPT(res.choices[0].message.content);
        } catch (error) {
         throw Error(error)
        }
    },

    generateRecipeList: async qty => {
        try {
            const res = await OpenAPI.command(`DF:create a list of ${qty ? qty + " " : ""}recipies with values`);
            
            parseGPT(res.data.choices[0].message.content);
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