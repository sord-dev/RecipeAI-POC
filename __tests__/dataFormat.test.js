const { GPTTools } = require('../utils')
const { parseGPT } = GPTTools;

describe('Parsing Data Format with parseGPT function', () => {
    const GPTfoods = `DF:[{"food_name": "apple", "nutritional_value": {"calories": 95, "vegetarian": True, "vegan": True}, "avr_price": 0.5}, {"food_name": "chicken breast", "nutritional_value": {"calories": 165, "vegetarian": False, "vegan": False}, "avr_price": 2.5}, {"food_name": "spinach", "nutritional_value": {"calories": 23, "vegetarian": True, "vegan": True}, "avr_price": 1.0}, {"food_name": "quinoa", "nutritional_value": {"calories": 120, "vegetarian": True, "vegan": True}, "avr_price": 3.0}, {"food_name": "salmon", "nutritional_value": {"calories": 206, "vegetarian": False, "vegan": False}, "avr_price": 5.0}]`

    const GPTrecipe = `DF:{"recipe_name": "Chicken Quinoa Bowl", "ingredients": [{"food_name": "chicken breast", "nutritional_value": {"calories": 165, "vegetarian": False, "vegan": False}, "avr_price": 2.5}, {"food_name": "quinoa", "nutritional_value": {"calories": 120, "vegetarian": True, "vegan": True}, "avr_price": 3.0}, {"food_name": "spinach", "nutritional_value": {"calories": 23, "vegetarian": True, "vegan": True}, "avr_price": 1.0}, {"food_name": "avocado", "nutritional_value": {"calories": 160, "vegetarian": True, "vegan": True}, "avr_price": 1.5}, {"food_name": "tomatoes", "nutritional_value": {"calories": 18, "vegetarian": True, "vegan": True}, "avr_price": 1.0}]}`


    it('Given Correct DF: Should return JSON', () => {
        let testFoodArr = parseGPT(GPTfoods);
        let testFood = testFoodArr[0];
        let testRecipe = parseGPT(GPTrecipe);

        expect(Array.isArray(testFoodArr)).toBe(true);
        expect(typeof testFood).toBe("object");
        expect(testFood.food_name).toMatch(/apple/ig);
        expect(testRecipe.recipe_name).toMatch(/Chicken Quinoa Bowl/ig);
    });

    it('Given Non String Should throw TypeError', () => {
        let incorrect = { name: 'test_name' };
        expect(() => parseGPT(incorrect)).toThrow()
    });

    it('Given an incorrect DF: should return a fallback object', () => {
        const incorrectFood = `DF:{"food_name": "apple", "nutritional_value": {"calories": 95, "vegetarian": True, "vegan": True}, "avr_price": 0.5`

        let test = parseGPT(incorrectFood);

        expect(typeof test).toBe('object')
    });

})