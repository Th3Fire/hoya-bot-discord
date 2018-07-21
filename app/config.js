const constants = require('./constants')
module.exports = {
    token: process.env.BOT_TOKEN || "NDY5NTA4MzM2NDIxOTYxNzM4.DjRv8Q.IZhgay6JPHEY9FvtBFStluAKxJE",
    mainChannelIDChatbot: process.env.DISCORD_CHANNEL_ID || "362987223454449665",
    simsimiOption: {
        lc: process.env.SIM_LC || "th",
        ft: process.env.SIM_FT || "0.0",
        key: process.env.SIM_KEY || ""
    },
    prefix: process.env.PREFIX || "!",
    ownerBotRole: [constants.MANAGE_CHANNELS],
    activity: process.env.BOT_ACTIVITY || "",
    multiChannel: process.env.MULTI_CHANNEL || true
}