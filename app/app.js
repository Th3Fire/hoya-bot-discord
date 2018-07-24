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

client.on('ready', async () => {
    console.log(chalk.green('Logged in as ' + chalk.blue.underline.bold(`${client.user.tag}!`)));
    console.log(chalk.green('Bot has started, with ' + chalk.hex('#00ff04').bold(client.users.size) + ' users, in ' + chalk.hex('#ff1ef7').bold(client.channels.size) + ' channels of ' + chalk.hex('#56d2ff').bold(client.guilds.size) + ' guilds.'));
    // const ch = await client.channels.get(mainChannelIDChatbot)
    // //console.log('ch : ', ch)
    // //console.log('client.guild : ', client.channels)
    // //console.log('default : ', getDefaultChannel(client.channels.guild))

    // let unique = [...new Set(client.channels.map(item => item.guild.id))];
    // //console.log('unique : ', unique)
    // client.channels.map(async data => {
    //     console.log('data.guild.id :', data.guild.id)
    //     console.log('data.guild.name :', data.guild.name)

    //     const checkSent = sentMsgCollection.find(data.guild.id, data.guild.name)
    //     console.log('checkSent : ', checkSent)
    //     const channel = await getDefaultChannel(data.guild);
    //     await sentMsgCollection.set(data.guild.id, data.guild.name)
    //     //!checkSent && channel.send('xxx')
    // })
    // client.channels.map(data => data.type === 'text' && data.name === 'general' && channelCollection.set(data.id, data.name)

    // )

    // let checkSent = sentMsgCollection.find('471376984220368916', 'test')
    // console.log('checkSent : ', checkSent)
    // console.log('collection :', channelCollection)

    // //ch.send(getStatus(client, ch))
    // //const channel = client.channels.map(async x => await x.send(status));

    // // channel && channel.send({
    // // })
    client.user.setActivity(activity);
});

client.on("guildMemberAdd", async (member) => {
    try {
        const channel = await func.getDefaultChannel(member.guild);
        console.log(`New user "${member.user.username}" has joined server"${member.guild.name}"`);
        channel.send(`🤝สวัสดี🤝 ${member} ยินดีต้อนรับสู่ห้อง 🏠${member.guild.name}🏠`);
    } catch (err) {
        console.error(err)
    }
});

client.on("guildMemberRemove", async (member) => {
    try {
        const channel = await func.getDefaultChannel(member.guild)
        console.log(`"${member.user.username}" has leave from server "${member.guild.name}"`);
        channel.send(`👋บ๊ายบาย👋 ${member} ได้ออกจากห้อง 🏠${member.guild.name}🏠`)
    } catch (err) {
        console.error(err)
    }

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
        if (command === 'unmute') {
            if (search(message.author.id, usersMuted, true)) {
                return message.reply('unmute เรียบร้อย คิดถึงเค้าละซิ้');
            } else {
                return;
            }
        } else if (command === 'mute') {
            if (search(message.author.id, usersMuted, false)) return;
            usersMuted.push(message.author.id);
            return message.reply('ชิชิชิ บังบาจ mute เค้าไปกะได้ *หากต้องการ unmute พิมพ์ !unmute');
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
