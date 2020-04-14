const express = require('express');
const router = express.Router();
const xml = require('xml2js');
const xmlparser = require('express-xml-bodyparser');
const fs = require('fs');

const validateInput = require('../models/validateInput');
const covid19ImpactEstimator = require('../repositories/estimator');

router.get('/', async (req, res) => {
    res.status(200).send('Covid-19 is gone');
});

router.post('/xml', xmlparser({trim: false, explicitArray: false}), async (req, res) => {
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(`Input is invalid. Detail: ${error.details[0].message}`);
    try {
        const builder = new xml.Builder({
            renderOpts: { 'pretty': false }
        });
        res.setHeader('Content-Type', 'applictaion/xml');
        return res.status(200).send(builder.buildObject(covid19ImpactEstimator(req.body)));
    }
    catch (error) {
        res.setHeader('Content-Type', 'applictaion/xml');
        return res.status(500).send(`An error occured. Error details: ${error}`);
    }
});

router.get('/logs', async (req, res) => {
    try {
        fs.readFile('./src/data/logs.json', (err, data) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'applictaion/text');
            return res.status(200).send(data);
        });        
    }
    catch (error) {
        return res.status(500).send(`An error occured. Error details: ${error}`);
    }
});

router.post('/*', async (req, res) => {
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(`Input is invalid. Detail: ${error.details[0].message}`);
    try {
        res.setHeader('Content-Type', 'applictaion/json');
        return res.status(200).send(covid19ImpactEstimator(req.body));
    }
    catch (error) {
        res.setHeader('Content-Type', 'applictaion/json');
        return res.status(500).send(`An error occured. Error details: ${error}`);
    }
});

module.exports = router;