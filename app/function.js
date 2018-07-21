const Simsimi = require('simsimi');
const chalk = require('chalk');
const config = require('./config')
const { author } = require('../package.json');
const { propEq } = require('ramda')
const { simsimiOption } = config
const path = require('path');
const { key } = require('./key/sim-key.json')
const { lc, ft, key = key } = simsimiOption
const simsimi = new Simsimi(simsimiOption);
const appDir = path.dirname(require.main.filename);
const fs = require('fs')
console.log('func key : ', key)
module.exports = {
    simsimi: (message) => {
        console.log('simsimiOption : ', simsimiOption)
        fs.readFile(appDir + '/key/sim-key.json', (err, data) => {
            if (err) throw err;
            console.log(data.key);
          });

        simsimi.listen(message.content, function (err, msg) {
            if (err) {
                if (err.result === 509) {
                    message.reply(`คีย์ Simsimi หมดอายุแล้ว เรียก ${author} ให้โหน่ยยยย...`);
                }
                return console.log(chalk.hex('#ff0000')(`error result : ${err.result}, message: ${err.msg}`));
            }
            message.reply(msg);
            console.log(chalk.hex('#fcfc20')('simsimi say : ') + chalk.hex('#fc2065')(msg))
        });
    }
}