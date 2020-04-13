const { 
    getCasesForICUByRequestedTime,
    getCasesForVentilatorsByRequestedTime,
    getCurrentlyInfected,
    getDollarsInFlight,
    getHospitalBedsByRequestedTime,
    getInfectionsByRequestedTime,
    getSevereCasesByRequestedTime
} = require ('./compute');

const covid19ImpactEstimator = (data) => {

    let impact = {};
    let severeImpact = {};

    const impactCurrentlyInfected = getCurrentlyInfected(data.reportedCases, 10);
    impact.currentlyInfected = impactCurrentlyInfected;
    impact.infectionsByRequestedTime = getInfectionsByRequestedTime(impactCurrentlyInfected);
    impact.severeCasesByRequestedTime = getSevereCasesByRequestedTime(impact.infectionsByRequestedTime);
    impact.hospitalBedsByRequestedTime = getHospitalBedsByRequestedTime(data.totalHospitalBeds, impact.severeCasesByRequestedTime);
    impact.casesForICUByRequestedTime = getCasesForICUByRequestedTime(impact.infectionsByRequestedTime);
    impact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsByRequestedTime(impact.infectionsByRequestedTime);
    impact.dollarsInFlight = getDollarsInFlight(impact.infectionsByRequestedTime);

    const severeImpactCurrentlyInfected = getCurrentlyInfected(data.reportedCases, 50);
    severeImpact.currentlyInfected = severeImpactCurrentlyInfected
    severeImpact.infectionsByRequestedTime = getInfectionsByRequestedTime(severeImpactCurrentlyInfected);
    severeImpact.severeCasesByRequestedTime = getSevereCasesByRequestedTime(severeImpact.infectionsByRequestedTime);
    severeImpact.hospitalBedsByRequestedTime = getHospitalBedsByRequestedTime(data.totalHospitalBeds, severeImpact.severeCasesByRequestedTime);
    severeImpact.casesForICUByRequestedTime = getCasesForICUByRequestedTime(severeImpact.infectionsByRequestedTime);
    severeImpact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsByRequestedTime(severeImpact.infectionsByRequestedTime);
    severeImpact.dollarsInFlight = getDollarsInFlight(severeImpact.infectionsByRequestedTime);

    let resultObject = {
        data,
        impact,
        severeImpact
    };

    return JSON.stringify(resultObject);
}

// const result = covid19ImpactEstimator(inputData);
// console.log(result);

module.exports = covid19ImpactEstimator;