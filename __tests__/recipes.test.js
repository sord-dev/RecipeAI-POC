const request = require('supertest');
const app = require('../app.js');

const server = request(app);

describe('Recipes Endpoint Tests', () => { 
    it('GET /api/recipes/random - Should return with a valid recipe', async () => {
        let response = await server.get('/api/recipes/random');

        expect(response.statusCode).toBe(200)
        expect(typeof response.body.recipe_name).toBe('string')
    });
    
    it('GET /api/recipes/random/:region - Should return with a valid recipe', async () => {
        let response = await server.get('/api/recipes/random/indian');

        expect(response.statusCode).toBe(200)
        expect(typeof response.body.recipe_name).toBe('string')
    });
    
 })