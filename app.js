const Discord = require('discord.js');
const client = new Discord.Client();
const Simsimi = require('simsimi');
const config = require('./config')
const chalk = require('chalk');

const { channelChatbotId, simsimiOption, token } = config
var simsimi = new Simsimi(config.simsimiOption);
const log = console.log

var usersMuted = [];
const search = (key, array, remove) => {
    if (remove) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                usersMuted.splice(i, 1);
                return true;
            }
        }
        return false;
    } else {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                return true;
            }
        }
        return false;
    }
}

client.on('ready', function (message) {
    log(chalk.green('Logged in as ' + chalk.blue.underline.bold(`${client.user.tag}!`) ));
    log(chalk.green('Bot has started, with ' + chalk.hex('#00ff04').bold(client.users.size) + ' users, in ' + chalk.hex('#ff1ef7').bold(client.channels.size) + ' channels of ' + chalk.hex('#56d2ff').bold(client.guilds.size) + ' guilds.'));
    client.user.setActivity(`ดูดกัญชา`);
});

client.on('message', function (message) {
    if (message.author.bot) return;
    //private message to bot
    if (message.channel.type === 'dm') {
        if (message.content.indexOf('!msg') === 0) {
            let msg = message.content.split(' ');
            if (msg.length > 1) {
                var channel = client.channels.get(channelChatbotId);
                channel.sendMessage(msg[1]);
            }
        }
        return;
    }
    if (message.channel.id != channelChatbotId) return;

    if (message.content == '!unmute') {
        if (search(message.author.id, usersMuted, true)) {
            message.reply('unmute เรียบร้อย คิดถึงเค้าละซิ้');
        } else {
            return;
        }
    }

    //check user mute bot? if true not response that user.
    if (search(message.author.id, usersMuted, false)) return;

    if (message.content == '!mute') {
        if (search(message.author.id, usersMuted, false)) return;
        usersMuted.push(message.author.id);
        message.reply('ชิชิชิ บังบาจ mute เค้าไปกะได้ *หากต้องการ unmute พิมพ์ !unmute');
    } else if (message.content != '!mute' && message.content != '!unmute') {
        simsimi.listen(message.content, function (err, msg) {
            if (err) return log.error(chalk.hex('#ff0000')(err));
            log(chalk.hex('#fcfc20')('simsimi say : ') + chalk.hex('#fc2065')(msg))
            message.reply(msg);
        });
    }
});

client.login(token);
