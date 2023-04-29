# RecipeAI Server

The backend web server for [RecipeAI](https://google.com).

## Table of Contents

- [RecipeAI Server](#recipeai-server)
  - [Table of Contents](#table-of-contents)
  - [Recipe Endpoints](#recipe-endpoints)
    - [Get All Recipes](#get-all-recipes)
    - [Get Recipe by ID](#get-recipe-by-id)
    - [Get User Pantry](#get-user-pantry)
    - [Add Food to User Pantry](#add-food-to-user-pantry)
    - [Remove Food from User Pantry](#remove-food-from-user-pantry)
    - [Get Recipe Recommendations for User](#get-recipe-recommendations-for-user)
  - [User Endpoints](#user-endpoints)
    - [Get user info](#get-user-info)
    - [Update User's Pantry](#update-users-pantry)
    - [Update User's Disliked Ingredients](#update-users-disliked-ingredients)
    - [Get User's Recipe Recommendations](#get-users-recipe-recommendations)
  - [Auth Endpoints](#auth-endpoints)
    - [Register a New User](#register-a-new-user)
    - [Login](#login)
    - [Logout](#logout)
    - [Refresh Token](#refresh-token)

## Recipe Endpoints

### Get All Recipes

- `GET /api/recipes`

Retrieves a list of all available recipes.

**Response:**

```json
[
  {
    "id": "5678",
    "name": "Spaghetti Bolognese",
    "image": "https://www.example.com/images/spaghetti-bolognese.jpg",
    "ingredients": [
      { "food_name": "pasta", "qty": "250g" },
      { "food_name": "ground beef", "qty": "500g" },
      { "food_name": "tomatoes", "qty": "400g" },
      { "food_name": "onion", "qty": "1" },
      { "food_name": "garlic", "qty": "2 cloves" }
    ]
  },
  {
    "id": "9876",
    "name": "Chicken Stir-Fry",
    "image": "https://www.example.com/images/chicken-stir-fry.jpg",
    "ingredients": [
      { "food_name": "chicken breasts", "qty": "2" },
      { "food_name": "broccoli", "qty": "1 head" },
      { "food_name": "carrots", "qty": "2" },
      { "food_name": "garlic", "qty": "2 cloves" },
      { "food_name": "soy sauce", "qty": "2 tbsp" }
    ]
  }
]
```

### Get Recipe by ID

- `GET /api/recipes/{recipeId}`

Retrieves the recipe with the specified ID.

**Response:**

```json
{
  "id": "5678",
  "name": "Spaghetti Bolognese",
  "image": "https://www.example.com/images/spaghetti-bolognese.jpg",
  "ingredients": [
    { "food_name": "pasta", "qty": "250g" },
    { "food_name": "ground beef", "qty": "500g" },
    { "food_name": "tomatoes", "qty": "400g" },
    { "food_name": "onion", "qty": "1" },
    { "food_name": "garlic", "qty": "2 cloves" }
  ],
  "instructions": [
    "Heat olive oil in a large saucepan over medium heat.",
    "Add onion and garlic and cook for 2 minutes or until softened.",
    "Add the ground beef and cook for 5 minutes or until browned.",
    "Stir in the tomatoes and bring to a simmer.",
    "Reduce heat to low and cook for 20 minutes or until the sauce has thickened.",
    "Cook the pasta according to the package directions.",
    "Serve the sauce over the pasta."
  ]
}
```

### Get User Pantry

- `GET /api/users/{userId}/pantry`

Retrieves the pantry of the user with the specified ID.

**Response:**

```json
{
  "user_id": "1234",
  "pantry": [
    { "food_name": "pork", "qty": "500g" },
    { "food_name": "carrots", "qty": "3" },
    { "food_name": "potatoes", "qty": "4" },
    { "food_name": "onion", "qty": "1" },
    { "food_name": "garlic", "qty": "3 cloves" }
  ]
}
```

### Add Food to User Pantry

- `POST /api/users/{userId}/pantry`

Adds a new food item to the pantry of the user with the specified ID.

**Request Body:**

```json
{
  "food_name": "chicken",
  "qty": "1kg"
}
```

**Response:**

```json
{
  "user_id": "1234",
  "pantry": [
    { "food_name": "pork", "qty": "500g" },
    { "food_name": "carrots", "qty": "3" },
    { "food_name": "potatoes", "qty": "4" },
    { "food_name": "onion", "qty": "1" },
    { "food_name": "garlic", "qty": "3 cloves" },
    { "food_name": "chicken", "qty": "1kg" }
  ]
}
```

### Remove Food from User Pantry

- `DELETE /api/users/{userId}/pantry/{foodName}`

Removes the specified food item from the pantry of the user with the specified ID.

**Response:**

```json
{
  "user_id": "1234",
  "pantry": [
    { "food_name": "pork", "qty": "500g" },
    { "food_name": "carrots", "qty": "3" },
    { "food_name": "potatoes", "qty": "4" },
    { "food_name": "onion", "qty": "1" },
    { "food_name": "garlic", "qty": "3 cloves" }
  ]
}
```

### Get Recipe Recommendations for User

- `POST /api/users/{userId}/recommendations`

Retrieves a list of recommended recipes based on the ingredients in the user's pantry.

**Request Body:**

```json
{
  "max_results": 5
}
```

**Response:**

```json
[
  {
    "id": "5678",
    "name": "Spaghetti Bolognese",
    "image": "https://www.example.com/images/spaghetti-bolognese.jpg",
    "missing_ingredients": [
      { "food_name": "pasta", "qty": "250g" },
      { "food_name": "ground beef", "qty": "500g" },
      { "food_name": "tomatoes", "qty": "400g" }
    ]
  },
  {
    "id": "9876",
    "name": "Chicken Stir-Fry",
    "image": "https://www.example.com/images/chicken-stir-fry.jpg",
    "missing_ingredients": [
      { "food_name": "broccoli", "qty": "1 head" },
      { "food_name": "carrots", "qty": "2" }
    ]
  }
]
```

## User Endpoints

### Get user info

- `GET /api/users/me`

Gets currently logged in users info

**Response:**

```json
{
  "id": 1,
  "name": "username",
  "pantry": [],
  "dislikes": []
}
```

### Update User's Pantry

- `PUT /api/users/{userId}/pantry`

Updates the user's pantry with new ingredients.

**Request Body:**

```json
{
  "pantry": [
    { "food_name": "pork", "qty": "500g" },
    { "food_name": "onion", "qty": "2" }
  ]
}
```

**Response:**

```json
{
  "id": "1234",
  "username": "johndoe",
  "pantry": [
    { "food_name": "pork", "qty": "500g" },
    { "food_name": "onion", "qty": "2" }
  ],
  "dislikedIngredients": []
}
```

### Update User's Disliked Ingredients

- `PUT /api/users/{userId}/dislikedIngredients`

Updates the user's list of disliked ingredients.

**Request Body:**

```json
{
  "dislikedIngredients": ["mushrooms", "peppers"]
}
```

**Response:**

```json
{
  "id": "1234",
  "username": "johndoe",
  "pantry": [
    { "food_name": "pork", "qty": "500g" },
    { "food_name": "onion", "qty": "2" }
  ],
  "dislikedIngredients": ["mushrooms", "peppers"]
}
```

### Get User's Recipe Recommendations

- `GET /api/users/{userId}/recommendations`

Retrieves recipe recommendations based on the user's pantry and disliked ingredients.

**Response:**

```json
[
  {
    "id": "5678",
    "name": "Spaghetti Bolognese",
    "image": "https://www.example.com/images/spaghetti-bolognese.jpg",
    "ingredients": [
      { "food_name": "pasta", "qty": "250g" },
      { "food_name": "ground beef", "qty": "500g" },
      { "food_name": "tomatoes", "qty": "400g" },
      { "food_name": "onion", "qty": "1" },
      { "food_name": "garlic", "qty": "2 cloves" }
    ]
  },
  {
    "id": "9876",
    "name": "Chicken Stir-Fry",
    "image": "https://www.example.com/images/chicken-stir-fry.jpg",
    "ingredients": [
      { "food_name": "chicken breasts", "qty": "2" },
      { "food_name": "broccoli", "qty": "1 head" },
      { "food_name": "carrots", "qty": "2" },
      { "food_name": "garlic", "qty": "2 cloves" },
      { "food_name": "soy sauce", "qty": "2 tbsp" }
    ]
  }
]
```

## Auth Endpoints

### Register a New User

- `POST /api/auth/register`

Registers a new user.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**

```json
{
  "user_id": "1234",
  "username": "johndoe",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

- `POST /api/auth/login`

Logs in a user.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**

```json
{
  "user_id": "1234",
  "username": "johndoe",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout

- `POST /api/auth/logout`

Logs out the currently authenticated user.

**Response:**

```json
{
  "message": "Logged out successfully."
}
```

### Refresh Token

- `POST /api/auth/refresh`

Refreshes the access token for the currently authenticated user.

**Response:**

```json
{
  "user_id": "1234",
  "username": "johndoe",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
