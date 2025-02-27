const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const routes = require('./server.js');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/facebook', routes );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});