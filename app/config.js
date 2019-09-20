const constants = require('./constants')
const { key } = require('./key/sim-key.json')

module.exports = {
    token: process.env.BOT_TOKEN || "NDcwMjk3NTQ0NDMwMTkwNjEy.DjUOpw.4hRtdTmY-DXPrmTnR7znCiFNVbg",
    mainChannelIDChatbot: process.env.DISCORD_CHANNEL_ID || "",
    simsimiOption: {
        lang: process.env.SIM_LC || "th",
        key: process.env.SIM_KEY || key || "YkwONF8Ehqssheq1nh9rLyupqEhWjspzC67fT3Rs",
        filter: '1.0'
    },
    prefix: process.env.PREFIX || "!",
    ownerBotID: process.env.OWNER_BOT_ID || "",
    activity: process.env.BOT_ACTIVITY || "🐎ดูดม้า🐎",
    multiChannel: process.env.MULTI_CHANNEL || "N",
    botChannelName: process.env.CHANNEL_NAME || "chat-bot",
    whitelistedRoleId: process.env.WHITELISTED_ROLE_ID || "",
}

