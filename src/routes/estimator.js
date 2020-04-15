const express = require('express');
const router = express.Router();
const xml = require('xml2js');
const xmlparser = require('express-xml-bodyparser');
const fs = require('fs');
var convert = require('xml-js');

const validateInput = require('../models/validateInput');
const covid19ImpactEstimator = require('../repositories/estimator');

router.get('/', async (req, res) => {
    res.status(200).send('Covid-19 is gone');
});

//router.post('/xml', xmlparser({trim: false, explicitArray: false}), async (req, res) => {
router.post('/xml', async (req, res) => {
    try {
        const builder = new xml.Builder({
            renderOpts: { 'pretty': false }
        });
        res.setHeader('Content-Type', 'application/xml');
        return res.status(200).send(builder.buildObject(covid19ImpactEstimator(req.body)));
    }
    catch (error) {
        res.setHeader('Content-Type', 'application/xml');
        return res.status(500).send(`An error occured. Error details: ${error}`);
    }
    // const acceptsXML = req.is('application/xml');
    // console.log(acceptsXML);
    // if (acceptsXML) {
    //     //const { error } = validateInput(req.body);
    //     //if (error) return res.status(400).send(`Input is invalid. Detail: ${error.details[0].message}`);
    //     try {
    //         // const jsonBody = convert.xml2json(req.body);
    //         // console.log(jsonBody);
    //         const builder = new xml.Builder({
    //             renderOpts: { 'pretty': false }
    //         });
    //         res.setHeader('Content-Type', 'application/xml');
    //         return res.status(200).send(builder.buildObject(covid19ImpactEstimator(req.body)));
    //     }
    //     catch (error) {
    //         res.setHeader('Content-Type', 'application/xml');
    //         return res.status(500).send(`An error occured. Error details: ${error}`);
    //     }
    // } else {
    //     return res.status(500).send(`An error occured. Error details: Request body not in xml format.`);
    // }
});

router.get('/logs', async (req, res) => {
    try {
        fs.readFile('./src/data/logs.json', (err, data) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send(data);
        });
    }
    catch (error) {
        return res.status(500).send(`An error occured. Error details: ${error}`);
    }
    // const acceptsTEXT = req.is('text/plain');
    // if (acceptsTEXT) {
    //     try {
    //         fs.readFile('./src/data/logs.json', (err, data) => {
    //             if (err) throw err;
    //             res.setHeader('Content-Type', 'text/plain');
    //             return res.status(200).send(data);
    //         });
    //     }
    //     catch (error) {
    //         return res.status(500).send(`An error occured. Error details: ${error}`);
    //     }
    // }else {
    //     return res.status(500).send(`An error occured. Error details: Request body not in text format.`);
    // }
});

router.post('/*', async (req, res) => {
    // const { error } = validateInput(req.body);
    //     if (error) return res.status(400).send(`Input is invalid. Detail: ${error.details[0].message}`);
        try {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(covid19ImpactEstimator(req.body));
        }
        catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).send(`An error occured. Error details: ${error}`);
        }
    //var acceptsJSON = req.acceptsEncodings('application/json');
    //const acceptsJSON = req.is('application/json');//req.accepts('application/json');
    // console.log(acceptsJSON);
    // if (acceptsJSON) {
    //     const { error } = validateInput(req.body);
    //     if (error) return res.status(400).send(`Input is invalid. Detail: ${error.details[0].message}`);
    //     try {
    //         res.setHeader('Content-Type', 'applictaion/json');
    //         return res.status(200).send(covid19ImpactEstimator(req.body));
    //     }
    //     catch (error) {
    //         res.setHeader('Content-Type', 'applictaion/json');
    //         return res.status(500).send(`An error occured. Error details: ${error}`);
    //     }
    // } else {
    //     return res.status(500).send(`An error occured. Error details: Request body not in json format.`);
    // }
});

module.exports = router;