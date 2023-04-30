# RecipeAI Server POC

Click here for [Full README](./Full-README.md)

Most interaction with the OpenAI API takes place in the [/utils/gpttools](./utils/gpttools) directory

- [RecipeAI Server POC](#recipeai-server-poc)
  - [How it works](#how-it-works)
  - [Limitations](#limitations)
    - [Large datasets will struggle](#large-datasets-will-struggle)
    - [Large latency time](#large-latency-time)
  - [Things of note](#things-of-note)
  - [Tech used currently](#tech-used-currently)
  - [Recipe Endpoints](#recipe-endpoints)
    - [Get Random Recipe](#get-random-recipe)
    - [Get Random Regonal Recipe](#get-random-regonal-recipe)
  - [Cloning this repo](#cloning-this-repo)

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

## Limitations

### Large datasets will struggle

Can only really generate a few recipes or foods at a time, meaning that generating large datasets will struggle.

- Possible fix would be to store a pregenorated amount of recipes and only generate the users recommended recipes at a time.
- User recommended recipes may need to be generated one by one on demand as well due to the same issue.

### Large latency time

From request to recipe generation:

![image](https://user-images.githubusercontent.com/75338985/235352560-f986acf0-baba-408d-90d9-20333b0438f5.png)

- Again the answer lies with how we utilise generating these recipes, generating and storing them beforehand then serving them sounds like a much more time efficient process.

## Things of note

- GPT word limit is said to be around **500 words/4000~ characters**. The prefix/init to establish mutual understanding is around **120 words/891 characters**.
- If GPT stops output due to overly complex input, we have no way of stopping it

## Tech used currently

- Express Draft (to create the express server quickly and efficiently)
- OpenAI API (AI curated recipes)
- Jest, Supertest (Testing Tooling + Endpoints)

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

### Get Random Regonal Recipe

- `GET /api/recipes/random/:regon`

Retrieves a random recipe curated by ChatGPT

**Response:**

```json
{
"recipe_name": "butter chicken curry",
    "ingredients": [
        {
        "food_name": "chicken",
        "nutritional_value": {
            "calories": 239,
            "vegetarian": false,
            "vegan": false
            },
        "avr_price": 6.99
    },
    {
        "food_name": "ghee",
        "nutritional_value": {
            "calories": 112,
            "vegetarian": true,
            "vegan": false
            },
        "avr_price": 4.99
    },
    {
        "food_name": "onion",
        "nutritional_value": {
            "calories": 64,
            "vegetarian": true,
            "vegan": true
            },
        "avr_price": 1.99
    },
    {
    "food_name": "tomato",
        "nutritional_value": {
            "calories": 22,
            "vegetarian": true,
            "vegan": true
            },
        "avr_price": 2.99
    },
    {
        "food_name": "garlic",
        "nutritional_value": {
            "calories": 5,
            "vegetarian": true,
            "vegan": true
            },
        "avr_price": 0.99
    },
    {
    "food_name": "ginger",
        "nutritional_value": {
            "calories": 13,
            "vegetarian": true,
            "vegan": true
            },
        "avr_price": 1.49
    },
    {
    "food_name": "turmeric",
        "nutritional_value": {
            "calories": 0,
            "vegetarian": true,
            "vegan": true
            },
        "avr_price": 4.99
    },
    {
    "food_name": "cayenne pepper",
        "nutritional_value": {
            "calories": 17,
            "vegetarian": true,
            "vegan": true
            },
        "avr_price": 3.49
    },
    {
    "food_name": "heavy cream",
        "nutritional_value": {
            "calories": 51,
            "vegetarian": true,
            "vegan": false
            },
        "avr_price": 2.99
    },
    {
    "food_name": "basmati rice",
        "nutritional_value": {
            "calories": 150,
            "vegetarian": true,
            "vegan": true
            },
        "avr_price": 4.99
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
