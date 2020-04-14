const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');

//requires
const updateLog = require('./src/middlewares/logger');
const getCallDurationInMilliseconds = require('./src/middlewares/duration');
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
//app.use(bodyParser.json());
//app.use(bodyParser.json());
app.use(xmlparser());
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const acceptsJSON = req.is('application/json');
    const acceptsXML = req.is('application/xml');
    const acceptsTEXT = req.is('text/plain');
    if (acceptsJSON || acceptsTEXT || acceptsXML) {
        req.accepts(['xml', 'text', 'json']);
        const startTime = process.hrtime();
        const timeStamp = Date.now();
        res.on('close', () => {
            const duration = getCallDurationInMilliseconds(startTime);
            const log = `${req.method}\t\t${req.originalUrl}\t\t${res.statusCode}\t\tdone in ${duration.toLocaleString()} ms`;
            updateLog(log);
        });
        next();
    } else {
        res.status(500).send('Internal Sevrer Error');
    }
});

//Routes
app.get('/', (req, res) => {
    res.send(`API Server is live!`);
});
app.use('/api/v1/on-covid-19', estimatorRoute);

//Error 404 - Resource not found handler
app.use((req, res, next) => {
    res.status(404).send('Sorry, The resource you requested was not found. Please refer to the API documentation.');
});