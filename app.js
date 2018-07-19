const Discord = require('discord.js');
const client = new Discord.Client();
const Simsimi = require('simsimi');
const config = require('./config')
//const bot = require('discord-rich-presence')('440179849349562401');

const { channelChatbotId, simsimiOption, token } = config

var simsimi = new Simsimi(config.simsimiOption);
const startTimestamp = new Date();
var arrMuteBot = [];
client.on('ready', function (message) {
    let today = new Date();
    let curHr = today.getHours();
    let greetMsg = "";

    if (curHr < 12) {
        greetMsg = 'สวัสดีตอนเช้า';
    } else if (curHr < 18) {
        greetMsg = 'สวัสดีตอนบ่าย';
    } else {
        greetMsg = 'สวัสดีตอนเย็น';
    }
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`ดูดกัญชา`);
    //var channel = client.channels.get('300568765001891843');
    //channel.sendMessage('@everyone บอทมาแล้วจ้าาาาาาา ' + greetMsg + ':pray::skin-tone-3: :pray::skin-tone-3: :pray::skin-tone-3:')
    //channel.sendMessage('อย่ายุ่งกะกูกูงอล ชิชิชิ' )
    //channel.sendMessage('บอทไปก่อนน้าาาา บุ้ยบุย...' )

    // bot.updatePresence({
    //     details: 'PUBG',
    //     startTimestamp,
    //     largeImageKey: 'large',
    //     smallImageKey: 'small',
        
    //     partyId: 'alone',
    //     partySize: 1,
    //     partyMax: 4,
    //     matchSecret: 'Hello',
    //     joinSecret: 'join',
    //     spectateSecret: 'look',
    //     instance: false
        
    //   });


});



function search(key, array, remove) {
    if (remove) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                console.log('remove : ', arrMuteBot[i]);
                arrMuteBot.splice(i, 1);
                console.log('array  : ', arrMuteBot);
                //return array[i];
                return true;
            }
        }
        return false;
    } else {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                //return array[i];
                return true;
            }
        }
        return false;
    }

}

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
        if (search(message.author.id, arrMuteBot, true)) {
            message.reply('unmute เรียบร้อย คิดถึงเค้าละซิ้');
        } else {
            return console.log('user not found : ', message.author.id);
        }

    }

    //check user mute bot? if true not response that user.
    if (search(message.author.id, arrMuteBot, false)) return;

    if (message.content == '!mute') {
        if (search(message.author.id, arrMuteBot, false)) return;
        arrMuteBot.push(message.author.id);
        message.reply('ชิชิชิ บังบาจ mute เค้าไปกะได้ *หากต้องการ unmute พิมพ์ !unmute');
    } else if (message.content != '!mute' && message.content != '!unmute') {
        simsimi.listen(message.content, function (err, msg) {
            if (err) return console.error(err);
            console.log('simsimi say : ', msg)
            message.reply(msg);
        });
    }
});

client.login(token);
