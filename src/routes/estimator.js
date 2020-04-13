const express = require('express');
const router = express.Router();
const covid19ImpactEstimator = require('../repositories/estimator');

router.get('/', async (req, res) => {
    res.status(200).send('Covid-19 is gone');
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const inputData = req.body;
        const result = covid19ImpactEstimator(inputData);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(`An error occured. Error details: ${error}`);
    }
});

module.exports = router;