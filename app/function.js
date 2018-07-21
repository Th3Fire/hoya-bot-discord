const Simsimi = require('simsimi');
const chalk = require('chalk');
const config = require('./config')
const fs = require('fs')
const path = require('path');
const appDir = path.dirname(require.main.filename);
const { author } = require('../package.json');
const { simsimiOption } = config


module.exports = {
    readFile: (path = "") => {
        console.log('path : ', path)
        const content = fs.readFileSync(path, "utf8", (err, data) => {
            if (err) return console.error(err)
        });
        return JSON.parse(content);
    },
    simsimi: (message) => {
        const { key } = module.exports.readFile(appDir + "\\key\\sim-key.json");
        simsimiOption.key = key;
        const simsimi = new Simsimi(simsimiOption);

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