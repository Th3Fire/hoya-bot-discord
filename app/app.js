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
    multiChannel,
    botChannelName
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
    client.user.setActivity(activity);
});

client.on("guildMemberAdd", async (member) => {
    try {
        const channel = await func.getDefaultChannel(member.guild);
        console.log(`New user "${member.user.username}" has joined server"${member.guild.name}"`);
        channel.send(`🤝สวัสดี🤝 ${member} ยินดีต้อนรับสู่ห้อง 🏠${member.guild.name}🏠`);
    } catch (err) {
        console.error(err);
    }
});

client.on("guildMemberRemove", async (member) => {
    try {
        const channel = await func.getDefaultChannel(member.guild)
        console.log(`"${member.user.username}" has leave from server "${member.guild.name}"`);
        channel.send(`👋บ๊ายบาย👋 \`${member.user.username}\` ได้ออกจากห้อง 🏠${member.guild.name}🏠`)

    } catch (err) {
        console.error(err);
    }

});

client.on("guildUpdate", (oldGuild, newGuild) => {
    if (oldGuild.name !== newGuild.name) {
        console.log(`ห้อง: ${oldGuild.name} เปลี่ยนชื่อห้องเป็น ${newGuild.name}`);
        channel.send(`ห้อง: ${oldGuild.name} เปลี่ยนชื่อห้องเป็น ${newGuild.name}`);
    }
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
    try {
        const channel = await func.getLogChannel(newMessage.member.guild);
        if (newMessage.author.bot) return;
        const embed = new Discord.RichEmbed()
            .setTitle(`✏️Edit Message`)
            .setDescription(`user : #${newMessage.author.username} edited message`)
            .setColor(0x00AE86)
            .setTimestamp()
            .addField("Before", oldMessage.content, true)
            .addField("After", newMessage.content, true);
        channel.send({ embed });
        console.log(`user : #${newMessage.author.username} edited message old:[\"${oldMessage.content}\"], new: [\"${newMessage.content}\"]`);
    } catch (err) {
        console.error(err);
    }
});

client.on("messageDelete", async (message) => {
    try {
        const channel = await func.getLogChannel(message.member.guild);
        if (message.author.bot) return;
        const embed = new Discord.RichEmbed()
            .setTitle(`🗑Delete Message`)
            .setDescription(`user : ***\`#${message.author.username}\`*** deleted message`)
            .setColor(16333113)
            .setTimestamp()
            .addField("Message", message.content, true)
        channel.send({ embed });
        console.log(`user : #${message.author.username} deleted message \"${message.content}\"`);
    } catch (err) {
        console.error(err);
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
    
    if ((message.channel.name !== botChannelName) && (multiChannel === 'N')) return;

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
