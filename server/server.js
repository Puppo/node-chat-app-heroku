
require('./config/config')

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicPath));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
