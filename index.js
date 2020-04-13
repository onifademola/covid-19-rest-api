const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser'); 

//requires
const estimatorRoute = require('./src/routes/estimator');

//App
const app = express();
const PORT = process.env.PORT || 3060;
app.listen(PORT);
console.log(`Server is listening on ${PORT}`);

//Middlewares
app.use(cors({
    origin: '*'
}));
//app.use(express.json);
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));


//Routes
app.get('/', (req, res) => {
    res.send(`API Server is live!`);
});
app.use('/api/v1/on-covid-19', estimatorRoute);


//Error 404 - Resource not found handler
app.use((req, res, next) =>{
    res.status(404).send('Sorry, The resource you requested was not found.');
});