const Discord = require('discord.js');
const client = new Discord.Client();
const Simsimi = require('simsimi');
const {
    token,
    simsimiOption
} = require('./config.json');

var simsimi = new Simsimi(simsimiOption);

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
    var channel = client.channels.get('300568765001891843');
    //channel.sendMessage('@everyone บอทมาแล้วจ้าาาาาาา ' + greetMsg + ':pray::skin-tone-3: :pray::skin-tone-3: :pray::skin-tone-3:' )
    //channel.sendMessage('อย่ายุ่งกะกูกูงอล ชิชิชิ' )
    //channel.sendMessage('บอทไปก่อนน้าาาา บุ้ยบุย...' )
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
    console.log('message ', message.content);

    
    
    if (message.content == '!unmute') {
        if (search(message.author.id, arrMuteBot, true)) {
            console.log('removed : ', arrMuteBot.length);
            message.reply('ควยยยยบังอาจ mute กู คิดถึงกูละซิ้');
        } else {
            return;
        }

    }

    //check user mute bot? if true not response that user.
    if (search(message.author.id, arrMuteBot, false)) return;

    if (message.content == '!mute') {
        if (search(message.author.id, arrMuteBot, false)) return;
        arrMuteBot.push(message.author.id);
        console.log('add user id : ', message.author.id);
        console.log('arr ', arrMuteBot);
        message.reply('ชิชิชิ บังบาจ mute เค้าไปกะได้ *หากต้องการ unmute พิมพ์ !unmute');
    } else {
        simsimi.listen(message.content, function (err, msg) {
            if (err) {
                console.log(err);
                if (err.result === 404) {
                    let arrNotFound = ["พิมพ์ควยไรกูไม่เข้าใจ","...","หนูไม่เข้าใจที่คุณพูดค่ะ"];
                    //message.reply(arrNotFound[Math.floor(Math.random() * arrNotFound.length)]);
                }
            }else {
                console.log('simsimi say : ', msg)
                message.reply(msg);
            }

        });
    }

})

client.login(token);