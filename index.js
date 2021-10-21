const express = require("express");
const app = express();
const routes = require('./routes/ciudad.js');

app.use(express.json());
app.use(routes);


const PORT = 8083

const listener = app.listen(PORT, () => {
    console.log(`Listening in port ${listener.address().port}`)
})