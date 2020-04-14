const getFactor = (periodType, timeToElapse) => {
    const factorRecieved = periodType.trim().toLowerCase();
    console.log(`get factor called from repo with ${factorRecieved}`);
    switch (factorRecieved) {
        case 'days':
            console.log(`days factor is ${Math.trunc((timeToElapse * 1) / 3)}`);
            return (Math.trunc((timeToElapse * 1) / 3));
        case 'weeks':
            console.log(`weeks factor is ${Math.trunc((timeToElapse * 7) / 3)}`);
            return Math.trunc((timeToElapse * 7) / 3);
        case 'months':
            console.log(`months factor is ${Math.trunc((timeToElapse * 30) / 3)}`);
            return Math.trunc((timeToElapse * 30) / 3);
        default:
            console.log(`days factor is default with ${Math.trunc((timeToElapse * 1) / 3)}`);
            return Math.trunc(timeToElapse);
    }
};

const getCurrentlyInfected = (value, factor) => { return value * factor; };

module.exports = {
    getFactor,
    getCurrentlyInfected
};