require('dotenv').config();
const app = require('./app.js');

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 @ http://localhost:${PORT}`)
});
