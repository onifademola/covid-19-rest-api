const express = require('express');
const router = express.Router();
//const accepts = require('accepts');
const xml = require('xml2js');
const fs = require('fs');
const covid19ImpactEstimator = require('../repositories/estimator');

router.get('/', async (req, res) => {
    res.status(200).send('Covid-19 is gone');
});

// router.post('/', async (req, res) => {
//     //console.log(req.body);
//     try {
//         const accept = accepts(req);
//         switch (accept.type(['json', 'xml'])) {
//             case 'json':
//                 res.setHeader('Content-Type', 'application/json');
//                 res.status(200).send(covid19ImpactEstimator(req.body));
//             default:
//                 const result = covid19ImpactEstimator(req.body);
//                 res.status(200).send(result);
//         }

//     }
//     catch (error) {
//         res.status(500).send(`An error occured. Error details: ${error}`);
//     }
// });

router.post('/xml', async (req, res) => {
    try {
        const builder = new xml.Builder({
            renderOpts: { 'pretty': false }
        });
        res.setHeader('Content-Type', 'applictaion/xml');
        res.status(200).send(builder.buildObject(covid19ImpactEstimator(req.body)));
    }
    catch (error) {
        res.setHeader('Content-Type', 'applictaion/xml');
        res.status(500).send(`An error occured. Error details: ${error}`);
    }
});

router.get('/logs', async (req, res) => {
    try {
        fs.readFile('./src/data/logs.json', (err, data) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'applictaion/text');
            res.status(200).send(data);
        });        
    }
    catch (error) {
        res.status(500).send(`An error occured. Error details: ${error}`);
    }
});

router.post('/*', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'applictaion/json');
        res.status(200).send(covid19ImpactEstimator(req.body));
    }
    catch (error) {
        res.setHeader('Content-Type', 'applictaion/json');
        res.status(500).send(`An error occured. Error details: ${error}`);
    }
});

module.exports = router;