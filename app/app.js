const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const version = require('../package.json').version;

const config = require('./config')
const constants = require('./constants')
const func = require('./function')
console.log('version : ', version)

const { prefix, channelChatbotId, token } = config

let channel;
const log = console.log;

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
    log(chalk.green('Logged in as ' + chalk.blue.underline.bold(`${client.user.tag}!`)));
    log(chalk.green('Bot has started, with ' + chalk.hex('#00ff04').bold(client.users.size) + ' users, in ' + chalk.hex('#ff1ef7').bold(client.channels.size) + ' channels of ' + chalk.hex('#56d2ff').bold(client.guilds.size) + ' guilds.'));
    channel = client.channels.get(channelChatbotId);
    channel.send({
        embed: {
            title: '📈 Deploy status',
            color: 11400258,
            description: `สถานะ: สำเร็จ \nเวลา: ${new Date()} \nบอท: ${client.user.username} \nแชนแนล: ${channel.name} \nversion: ${version}`,
            footer: {
                text: 'Build by : Wuttinan Chaoyos [WannCry]'
            }
        }
    })
    client.user.setActivity(`ดูดกัญชา`);
});

client.on('message', function (message) {
    if (message.author.bot) return;

    let myRole = message.member.hasPermission([constants.MANAGE_CHANNELS], false, true)

    //private message to bot
    if (message.channel.type === 'dm') {
        if (message.content.indexOf('!msg') === 0) {
            let msg = message.content.split(' ');
            if (msg.length > 1) {
                channel.send(msg[1]);
            }
        }
        return;
    }
    if (message.channel.id !== channelChatbotId) return;


    //check message is command
    if (message.content.startsWith(prefix)) {

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase();

        console.log('args : ', args)
        console.log('command : ', command)

        try {
            let commandFile = require(`./commands/${command}`)
            commandFile.run(client, message, args)
        } catch (err) {
            console.error(err)
        }


        if (message.content === '!unmute') {
            if (search(message.author.id, usersMuted, true)) {
                message.reply('unmute เรียบร้อย คิดถึงเค้าละซิ้');
            } else {
                return;
            }
        } else if (message.content === '!mute') {
            if (search(message.author.id, usersMuted, false)) return;
            usersMuted.push(message.author.id);
            message.reply('ชิชิชิ บังบาจ mute เค้าไปกะได้ *หากต้องการ unmute พิมพ์ !unmute');
            return;
        }

        return;
    }

    //check user mute bot? if true not response that user.
    if (search(message.author.id, usersMuted, false)) return;

    try {
        func.simsimi(message)
    } catch (err) {
        console.log(chalk.hex('#ff0000')(`error: ${err}`))
    }


});

client.on('disconnect', function (event) {
    console.log('event : ', event)
})

client.login(token);
