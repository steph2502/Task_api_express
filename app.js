const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);



app.listen(3000, () => {
    console.log("server is running ");
});
