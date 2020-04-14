const fs = require('fs');

const updateLog = (data) => {
    const text = `${data} \n`;
    fs.appendFile('./src/data/logs.json', text, 'utf8', function (err) {
        if (err) {
            console.log(err);
        } else {
            //Do nothiing cos everything went well!
        }
    });
};

module.exports = updateLog;