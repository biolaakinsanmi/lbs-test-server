const express = require('express');
const routes = require('./routes');
var cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/api', routes);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

module.exports = app
