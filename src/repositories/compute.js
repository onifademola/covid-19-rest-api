const getFactor = (periodType, timeToElapse) => {
    const factorRecieved = periodType.trim().toLowerCase();
    switch (factorRecieved) {
        case 'days':
            return (Math.trunc((timeToElapse * 1) / 3));
        case 'weeks':
            return Math.trunc((timeToElapse * 7) / 3);
        case 'months':
            return Math.trunc((timeToElapse * 30) / 3);
        default:
            return Math.trunc(timeToElapse);
    }
};

const getPeriod = (periodType, timeToElapse) => {
    const factorRecieved = periodType.trim().toLowerCase();
    switch (factorRecieved) {
        case 'days':
            return (timeToElapse * 1);
        case 'weeks':
            return (timeToElapse * 7);
        case 'months':
            return (timeToElapse * 30);
        default:
            return timeToElapse;
    }
};

const getCurrentlyInfected = (value, factor) => { return value * factor; };

module.exports = {
    getFactor,
    getPeriod,
    getCurrentlyInfected
};