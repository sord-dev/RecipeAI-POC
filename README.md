# RecipeAI Server POC

Click here for [Full README](./Full-README.md)

Most interaction with the OpenAI API takes place in the [/utils/gpttools](./utils/gpttools) directory

## How it works

Us and ChatGPT agree on a mutual way of thinking about foods and recipes in json, once established we can request for chatGPT to give us currated recipes based on our customised prompts.

In [prefix.txt](./utils/gpttools/prefix.txt) you'll see the prompt in which we do this. This file is loaded into a custom method used in [models/ChatGPT](./models/ChatGPT.js). 

Custom "command" OpenAI method:

![image](https://user-images.githubusercontent.com/75338985/235327116-ac7f09c6-eb5b-4f89-8d98-82f5c29397bc.png)

Generate random recipe using the ChatGPT model:

![image](https://user-images.githubusercontent.com/75338985/235327175-61904b59-b56a-46db-8677-aae0006b974d.png)

## Things of note

- GPT word limit is said to be around 500 words/4000~ characters. The prefix/init to establish mutual understanding is around 120 words/891 characters.
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
