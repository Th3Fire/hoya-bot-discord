const Simsimi = require('simsimi');
const chalk = require('chalk');
const config = require('./config')
const { simsimiOption } = config

const simsimi = new Simsimi(simsimiOption);

module.exports = {
    simsimi: (message) => {
        simsimi.listen(message.content, function (err, msg) {
            if (err) {
                return console.log(chalk.hex('#ff0000')(`error result : ${err.result}, message: ${err.msg}`));
            }
            message.reply(msg);
            console.log(chalk.hex('#fcfc20')('simsimi say : ') + chalk.hex('#fc2065')(msg))
        });
    }
}