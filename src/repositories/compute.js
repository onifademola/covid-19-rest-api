
const getCurrentlyInfected = (value, factor) => {
    if (typeof value !== 'number' || typeof factor !== 'number')
        return 0;
    return value * factor;
};

const getInfectionsByRequestedTime = (value) => {
    if (typeof value !== 'number')
        return 0;
    return value * (Math.pow(2, 10));
};

const getSevereCasesByRequestedTime = (value) => {
    if (typeof value !== 'number')
        return 0;
    var result = (15 / 100) * value;
    //console.log('severe cases before floor: ', result);
    return Math.trunc(result);
};

const getHospitalBedsByRequestedTime = (totalHospitalBeds, severeCasesByRequestedTime) => {
    if (typeof totalHospitalBeds !== 'number' || typeof severeCasesByRequestedTime !== 'number')
        return 0;
    const hospitalBedAlreadyInUse = (65 / 100) * totalHospitalBeds;
    return Math.trunc(hospitalBedAlreadyInUse - severeCasesByRequestedTime);
};

const getCasesForICUByRequestedTime = (value) => {
    if (typeof value !== 'number')
        return 0;
    const result = (5 / 100) * value;
    return Math.trunc(result);
};

const getCasesForVentilatorsByRequestedTime = (value) => {
    if (typeof value !== 'number')
        return 0;
    const result = (2 / 100) * value;
    return Math.trunc(result);
};

const getDollarsInFlight = (value) => {
    if (typeof value !== 'number')
        return 0;
    const result = (value * 0.65) * 1.5 * 30;
    return Math.trunc(result);
};

module.exports = {
    getCasesForICUByRequestedTime,
    getCasesForVentilatorsByRequestedTime,
    getCurrentlyInfected,
    getDollarsInFlight,
    getHospitalBedsByRequestedTime,
    getInfectionsByRequestedTime,
    getSevereCasesByRequestedTime
};