const fs = require('fs')
const Discord = require('discord.js')
const chalk = require('chalk')
const emojiStrip = require('emoji-strip')
const config = require('./config')
const func = require('./function')
const googleAuth = require('./googleAuth')
const translation = require('./translation')
const langCode = require('./langCode')
const { code } = require('country-emoji');
const {
    prefix,
    token,
    activity,
    multiChannel,
    botChannelName,
    feature,
} = config

//Setup authentication for google translation
googleAuth().catch(console.error)

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./app/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()

var usersMuted = []
const search = (key, array, remove) => {
    if (remove) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                usersMuted.splice(i, 1)
                return true
            }
        }
        return false
    } else {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === key) {
                return true
            }
        }
        return false
    }
}

client.on('ready', () => {
    console.log(chalk.green('Logged in as ' + chalk.blue.underline.bold(`${client.user.tag}!`)))
    client.user.setActivity(activity)
})

client.on("guildMemberAdd", async (member) => {
    if (!feature.ANNOUNCE_USER_JOIN) return
    try {
        const channel = await func.getDefaultChannel(member.guild)
        console.log(`New user "${member.user.username}" has joined server"${member.guild.name}"`)
        channel.send(`🤝สวัสดี🤝 ${member} ยินดีต้อนรับสู่ห้อง 🏠${member.guild.name}🏠`)
    } catch (err) {
        console.error(err)
    }
})

client.on("guildMemberRemove", async (member) => {
    if (!feature.ANNOUNCE_USER_LEAVE) return
    try {
        const channel = await func.getDefaultChannel(member.guild)
        console.log(`"${member.user.username}" has leave from server "${member.guild.name}"`)
        channel.send(`👋บ๊ายบาย👋 \`${member.user.username}\` ได้ออกจากห้อง 🏠${member.guild.name}🏠`)

    } catch (err) {
        console.error(err)
    }

})

client.on("guildUpdate", async (oldGuild, newGuild) => {
    if (!feature.ANNOUNCE_CHANNEL_UPDATE) return
    try {
        const channel = await func.getDefaultChannel(newGuild)
        if (oldGuild.name !== newGuild.name) {
            console.log(`Server: ${oldGuild.name} ถูกเปลี่ยนชื่อ Server เป็น ${newGuild.name}`)
            channel.send(`🛰Server: __\`${oldGuild.name}\`__ ถูกเปลี่ยนชื่อเป็น __\`${newGuild.name}\`__ 🛰`)
        }
    } catch (err) {
        console.error(err)
    }
    
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (!feature.ANNOUNCE_EDIT_MSG) return
    try {
        const channel = await func.getLogChannel(newMessage.member.guild)
        if (newMessage.author.bot) return
        const embed = new Discord.RichEmbed()
            .setTitle(`✏️Edit Message`)
            .setDescription(`user : #${newMessage.author.username} edited message`)
            .setColor(0x00AE86)
            .setTimestamp()
            .addField("Before", oldMessage.content, true)
            .addField("After", newMessage.content, true)
        channel.send({ embed })
        console.log(`user : #${newMessage.author.username} edited message old:[\"${oldMessage.content}\"], new: [\"${newMessage.content}\"]`)
    } catch (err) {
        console.error(err)
    }
})

client.on("messageDelete", async (message) => {
    if (!feature.ANNOUNCE_DEL_MSG) return
    try {
        const channel = await func.getLogChannel(message.member.guild)
        if (message.author.bot) return
        const embed = new Discord.RichEmbed()
            .setTitle(`🗑Delete Message`)
            .setDescription(`user : ***\`#${message.author.username}\`*** deleted message`)
            .setColor(16333113)
            .setTimestamp()
            .addField("Message", message.content, true)
        channel.send({ embed })
        console.log(`user : #${message.author.username} deleted message \"${message.content}\"`)
    } catch (err) {
        console.error(err);
    }
});

client.on("userUpdate", (oldUser, newUser) => {
    if (!feature.ANNOUNCE_USER_UPDATE) return
    if (oldUser.username !== newUser.username) {
        console.log(`member ${oldUser.username} เปลี่ยนชื่อผู้ใช้เป็น ${newUser.username}`)
        channel.send(`member ${oldUser.username} เปลี่ยนชื่อผู้ใช้เป็น ${newUser.username}`)
    }
})

client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift().toLowerCase()
        if (commandName === 'unmute') {
            if (search(message.author.id, usersMuted, true)) {
                return message.reply('unmute เรียบร้อย คิดถึงเค้าละซิ้')
            } else {
                return
            }
        } else if (commandName === 'mute') {
            if (search(message.author.id, usersMuted, false)) return
            usersMuted.push(message.author.id)
            return message.reply('ชิชิชิ บังบาจ mute เค้าไปกะได้ *หากต้องการ unmute พิมพ์ !unmute')
        }

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        
        if (!command) return

        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('ฉันไม่สามารถดำเนินการคำสั่งใน DM ได้!')
        }

        if (command.args && !args.length) {
            let reply = `คุณไม่ได้ระบุอาร์กิวเมนต์, ${message.author}!`
    
            if (command.usage) {
                reply += `\nตัวอย่างการใช้งานคำสั่ง: \`${prefix}${command.name} ${command.usage}\``
            }
    
            return message.channel.send(reply)
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now()
        const timestamps = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 3) * 1000

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                return message.reply(`โปรดรอ ${timeLeft.toFixed(1)} วินาที ก่อนใช้งานคำสั่ง \`${command.name}\` อีกครั้ง`)
            }
        }

        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

        try {
            command.execute(message, args)
        } catch (error) {
            console.error(error)
            message.reply('มีข้อผิดพลาดในการพยายามดำเนินการคำสั่ง!')
        }
        return
    }
    if ((emojiStrip(message.channel.name) !== botChannelName) && (multiChannel === 'N')) return
    //check user mute bot? if true do not response that user.
    if (search(message.author.id, usersMuted, false)) return
    // Simsimi here
    try {
        if(!feature.ENABLE_SIMSIMI_BOT) return
        func.simsimi(message)
    } catch (err) {
        console.log(chalk.hex('#ff0000')(`error: ${err}`))
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch()
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error)
			// Return as `reaction.message.author` may be undefined/null
			return
		}
    }

    // Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`)
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`)

    const countryCode = code(reaction.emoji.name)
    if (countryCode) {
        const flags = Object.keys(langCode)
        let country = ''
        if(flags.includes(countryCode.toLowerCase())) {
            country = countryCode.toLowerCase()
        } else {
        return
        }
        let lang = langCode[country]
        if(!lang) return

        const translated = await translation({ text: reaction.message.content, target: lang })
        // return reaction.message.reply(translated)
        // inside a command, event listener, etc.
        const textEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Translation - แปลภาษา')
            .setDescription(`ข้อความถูกแปลภาษาเป็น ${reaction.emoji.name}`)
            .setThumbnail('http://icons.iconarchive.com/icons/marcus-roberto/google-play/256/Google-Translate-icon.png')
            .addFields(
                { name: 'ข้อความเดิม', value: reaction.message.content },
                { name: 'ข้อความที่ถูกแปล', value: translated },
            )
            .setTimestamp()
            .setFooter('translated by Google', 'https://img.icons8.com/color/50/000000/google-logo.png')

        reaction.message.reply(textEmbed)
    }
})

client.login(token)
