const Simsimi = require('simsimi');
const chalk = require('chalk');
const config = require('./config')
const { author } = require('../package.json');
const { simsimiOption } = config

const simsimi = new Simsimi(simsimiOption);

module.exports = {
    simsimi: (message) => {
        simsimi.listen(message.content, function (err, msg) {
            if (err) {
                console.log('err.result :', err.result)
                if (err.result === '509') {
                    console.log('509')
                    message.reply(`คีย์ Simsimi หมดอายุแล้ว เรียก ${author} ให้โหน่ยยยย...`);
                }
                return console.log(chalk.hex('#ff0000')(`error result : ${err.result}, message: ${err.msg}`));
            }
            message.reply(msg);
            console.log(chalk.hex('#fcfc20')('simsimi say : ') + chalk.hex('#fc2065')(msg))
        });
    }
}