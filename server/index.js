const app = require('express')();

app.get('/', (req, res) => {
  res.send('Hello server').status(200);
})

app.listen(5500);