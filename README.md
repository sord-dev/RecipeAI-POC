# RecipeAI Server POC

Click here for [Full README](./Full-README.md)

Most interaction with the OpenAI API takes place in the [/utils/gpttools](./utils/gpttools) directory

## How it works

Us and ChatGPT agree on a mutual way of thinking about foods and recipes in json, once established we can request for chatGPT to give us currated recipes based on our customised prompts.

In [prefix.txt](./utils/gpttools/prefix.txt) you'll see the prompt in which we do this. This file is loaded into a custom method used in [models/ChatGPT](./models/ChatGPT.js). 

***utils/gpttools/index.js:***

```js
OpenAPI.command = async (content) => { // custom helper command to easily command gpt with our dataformat and json structure
    let cmd = { role: "user", content: prefix + ' ' + content };
    const res = await OpenAPI.createChatCompletion({ model: 'gpt-3.5-turbo', messages: [cmd] });

    return res.data;
}
```

***models/ChatGPT.js:***

```js
    // Generate random recipe using the ChatGPT model:
    generateRecipe: async () => {
        try {
            const res = await OpenAPI.command(`DF:create a recipe with values`);

            return parseGPT(res.choices[0].message.content);
        } catch (error) {
         throw Error(error)
        }
    }
```

## Things of note

- GPT word limit is said to be around **500 words/4000~ characters**. The prefix/init to establish mutual understanding is around **120 words/891 characters**.
- If GPT stops output due to overly complex input, we have no way of stopping it

## Tech used currently

- Express Draft (to create the express server quickly and efficiently)
- OpenAI API (AI curated recipes)
- Jest (Testing Tooling + Endpoints)

## Recipe Endpoints

### Get Random Recipe

- `GET /api/recipes/random`

Retrieves a random recipe curated by ChatGPT

**Response:**

```json
{
    "recipe_name": "taco salad",
    "ingredients": [
        {
            "food_name": "ground beef",
            "nutritional_value": {
                "calories": 250,
                "vegetarian": false,
                "vegan": false
            },
            "avr_price": 5
        },
        {
            "food_name": "lettuce",
            "nutritional_value": {
                "calories": 10,
                "vegetarian": true,
                "vegan": true
            },
            "avr_price": 2
        },
        {
            "food_name": "tomatoes",
            "nutritional_value": {
                "calories": 20,
                "vegetarian": true,
                "vegan": true
            },
            "avr_price": 2
        },
        {
            "food_name": "cheddar cheese",
            "nutritional_value": {
                "calories": 110,
                "vegetarian": true,
                "vegan": false
                },
            "avr_price": 3
        },
        {
        "food_name": "doritos",
                "nutritional_value": {
                "calories": 140,
                "vegetarian": true,
                "vegan": true
                },
            "avr_price": 2
        }
    ]
}
```

## Cloning this repo

1. To get the sample code from GitHub, use the  `git clone`  command to get a local copy of the remote repository. To clone the sample code, run the following command:

    ```bash
    git clone https://github.com/sord-dev/RecipeAI-POC.git
    ```

2. Create a .env file in the root directory of your project, with the following key value pairs:

    ```env
    PORT=3000
    OPEN_AI_API_KEY=[Go Here](https://platform.openai.com/account/api-keys)
    ```

    Get an openai api key [here](https://platform.openai.com/account/api-keys)

3. Install dependencies

    ``` bash
    cd RecipeAI-POC
    npm i
    ```

4. Launch the developer server

    ``` bash
    npm run dev
    ```
