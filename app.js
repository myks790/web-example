const express = require('express');
const express_port = 8081;
const app = express();
app.use(express.static('web'));

app.listen(express_port, () => {
    console.log(`express app listening at http://localhost:${express_port}`);
});
