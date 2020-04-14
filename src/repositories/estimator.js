const { getFactor, getCurrentlyInfected } = require ('./compute');

const normalCases = (reportedcases, calcfactor) => { return Math.trunc((reportedcases * 10) * (Math.pow(2, calcfactor))); };
const severeCases = (reportedcases, calcfactor) => { return Math.trunc((reportedcases * 50) * (Math.pow(2, calcfactor))); };
const hospitalBeds = (totalHospitalbeds) => { return (0.35 * totalHospitalbeds)};

const covid19ImpactEstimator = (data) => {

    let impact = {};
    let severeImpact = {};

    const factor = getFactor(data.periodType, data.timeToElapse);
    console.log(`factor is ${factor}`);

    impact.currentlyInfected = getCurrentlyInfected(data.reportedCases, 10);
    impact.infectionsByRequestedTime = normalCases(data.reportedCases, factor);
    impact.severeCasesByRequestedTime = Math.trunc(0.15 * normalCases(data.reportedCases, factor));
    impact.hospitalBedsByRequestedTime = Math.trunc((hospitalBeds(data.totalHospitalBeds)) - (0.15 * normalCases(data.reportedCases, factor)));
    impact.casesForICUByRequestedTime = Math.trunc(0.05 * normalCases(data.reportedCases, factor));
    impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * normalCases(data.reportedCases, factor));
    impact.dollarsInFlight = Math.trunc((normalCases(data.reportedCases, factor)) * (data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation) * (Math.pow(2, factor)));

    severeImpact.currentlyInfected = getCurrentlyInfected(data.reportedCases, 50)
    severeImpact.infectionsByRequestedTime = severeCases(data.reportedCases, factor);
    severeImpact.severeCasesByRequestedTime = Math.trunc(0.15 * severeCases(data.reportedCases, factor));
    severeImpact.hospitalBedsByRequestedTime = Math.trunc((hospitalBeds(data.totalHospitalBeds)) - (0.15 * severeCases(data.reportedCases, factor)));
    severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeCases(data.reportedCases, factor));
    severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * severeCases(data.reportedCases, factor));
    severeImpact.dollarsInFlight = Math.trunc((severeCases(data.reportedCases, factor)) * (data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation) * (Math.pow(2, factor)));

    
    return {
        data,
        impact,
        severeImpact
    };
}

module.exports = covid19ImpactEstimator;