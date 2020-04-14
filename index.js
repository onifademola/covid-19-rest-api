const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

//requires
const { getCallDurationInMilliseconds } = require('./src/repositories/compute');
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
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    //console.log(`${req.method} ${req.originalUrl} [STARTED]`);
    const startTime = process.hrtime();
    const timeStamp = Date.now();

    // res.on('finish', () => {
    //     const duration = getCallDurationInMilliseconds(startTime);     
    //     //console.log(`${timeStamp} ${req.method} ${req.originalUrl} [FINISHED] ${duration.toLocaleString()} secs`);
    //     console.log(`${timeStamp} ${req.originalUrl} done in ${duration.toLocaleString()} secs`);
    // })

    res.on('close', () => {
        const duration = getCallDurationInMilliseconds(startTime);
        //console.log(`${timeStamp} ${req.originalUrl} done in ${duration.toLocaleString()} secs`);
        const log = `${timeStamp} ${req.originalUrl} done in ${duration.toLocaleString()} seconds`;
        updateLogText(log);
    })

    next();
});

// const updateLog = (callLog) => {
//     fs.readFile('logs.json', 'utf8', function (err, data) {
//         if (err) {
//             console.log(err)
//         } else {
//             const file = JSON.parse(data);
//             file.push(callLog);
//             const json = JSON.stringify(file);
//             fs.writeFile('logs.json', json, 'utf8', function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     //Everything went OK!
//                 }
//             });
//         }
//     });
// };

const updateLogText = (callLog) => {
    const dat = `\t\t ${callLog} \n`;
    fs.appendFile('./src/data/logs.json', dat, 'utf8', function (err) {
        if (err) {
            console.log(err);
        } else {
            //Do nothiing cos everything went well!
        }
    });
};

//Routes
app.get('/', (req, res) => {
    res.send(`API Server is live!`);
});
app.get('/deletelogs', (req, res) => {
    updateLog([]);
    res.send(`Call logs deleted!`);
});
app.use('/api/v1/on-covid-19', estimatorRoute);

//Error 404 - Resource not found handler
app.use((req, res, next) => {
    res.status(404).send('Sorry, The resource you requested was not found.');
});