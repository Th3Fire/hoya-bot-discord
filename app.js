const Discord = require('discord.js');
const client = new Discord.Client();
const Simsimi = require('simsimi');
const {
    token,
    simsimiOption
} = require('./config.json');

var simsimi = new Simsimi(simsimiOption);

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
    client.user.setActivity(`Nothing`);
    var channel = client.channels.get('300568765001891843');
    channel.sendMessage('@everyone บอทมาแล้วจ้าาาาาาา ' + greetMsg + ':pray::skin-tone-3: :pray::skin-tone-3: :pray::skin-tone-3:' )
});

client.on('message', function (message) {
    if (message.author.bot) return;
    console.log('message ', message.content)
    simsimi.listen(message.content, function (err, msg) {
        if (err) return console.error(err);
        console.log('simsimi say : ', msg)
        message.reply(msg);
    })
})

client.login(token);