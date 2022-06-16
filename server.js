const express = require('express');
const PORT = process.env.PORT||8000;
const app = express();

app.listen(console.log(`server is running on port ${PORT}`))