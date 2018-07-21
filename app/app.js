const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const { author, version } = require('../package.json');

const config = require('./config')
const func = require('./function')

const {
    prefix,
    mainChannelIDChatbot,
    token,
    activity,
    multiChannel
} = config

let channel;
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

client.on('ready', () => {
    console.log(chalk.green('Logged in as ' + chalk.blue.underline.bold(`${client.user.tag}!`)));
    console.log(chalk.green('Bot has started, with ' + chalk.hex('#00ff04').bold(client.users.size) + ' users, in ' + chalk.hex('#ff1ef7').bold(client.channels.size) + ' channels of ' + chalk.hex('#56d2ff').bold(client.guilds.size) + ' guilds.'));
    channel = client.channels.get(mainChannelIDChatbot);
    channel.send({
        embed: {
            title: '📈Deploy application status',
            color: 11400258,
            //description: `สถานะ: สำเร็จ \nเวลา: ${new Date()} \nบอท: ${client.user.username} \nแชนแนล: ${channel.name} \nversion: ${version}`,
            footer: {
                text: `Developed by : ${author}`
            },
            fields: [
                {
                    name: 'สถานะ:',
                    value: 'สำเร็จ'
                },
                {
                    name: 'ชื่อบอท:',
                    value: client.user.username
                }
                , {
                    name: 'แชนแนล:',
                    value: channel.name
                },
                {
                    name: 'ออนไลน์:',
                    value: `${client.guilds.size} แชนแนล`
                },
                {
                    name: 'เวลา:',
                    value: new Date()
                },
                {
                    name: 'เวอร์ชัน:',
                    value: version
                }
            ],
            timestamp: new Date(),

        }
    })
    client.user.setActivity(activity);
});

client.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
    channel.send(`🤝ยินดีต้อนรับ🤝 ${member.user.username} สู่ห้อง 🏠${member.guild.name}🏠`)
});

client.on("guildMemberRemove", (member) => {
    console.log(`"${member.user.username}" has leave from "${member.guild.name}"`);
    channel.send(`🤝ลาก่อน🤝 ${member.user.username} ได้ออกจากห้อง 🏠${member.guild.name}🏠`)
});

client.on("guildUpdate", (oldGuild, newGuild) => {
    if (oldGuild.name !== newGuild.name) {
        console.log(`ห้อง: ${oldGuild.name} เปลี่ยนชื่อห้องเป็น ${newGuild.name}`);
        channel.send(`ห้อง: ${oldGuild.name} เปลี่ยนชื่อห้องเป็น ${newGuild.name}`)
    }
});

client.on("userUpdate", (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {
        console.log(`member ${oldUser.username} เปลี่ยนชื่อผู้ใช้เป็น ${newUser.username}`);
        channel.send(`member ${oldUser.username} เปลี่ยนชื่อผู้ใช้เป็น ${newUser.username}`)
    }
});

client.on('message', async message => {
    if (message.author.bot) return;
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
    if (message.channel.id !== mainChannelIDChatbot && !multiChannel) return;

    if (message.content.startsWith(prefix)) {

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase();

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

        try {
            let commandFile = require(`./commands/${command}`)
            commandFile.run(client, message, args)
        } catch (err) {
            console.error(err)
            message.reply(`ไม่พบคำสั่ง ${prefix}${command}`);
        }
        return;
    }

    //check user mute bot? if true not response that user.
    if (search(message.author.id, usersMuted, false)) return;

    // Simsimi here
    try {
        func.simsimi(message)
    } catch (err) {
        console.log(chalk.hex('#ff0000')(`error: ${err}`))
    }

});

client.login(token);
