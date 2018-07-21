const constants = require('./constants')
module.exports = {

    token: process.env.BOT_TOKEN || "NDY5NTA4MzM2NDIxOTYxNzM4.DjUVEw.GjAMVSXnVZhKw92RBXLIwGHCrx8",
    mainChannelIDChatbot: process.env.DISCORD_CHANNEL_ID || "362987223454449665",
    simsimiOption: {
        lc: process.env.SIM_LC || "th",
        ft: process.env.SIM_FT || "0.0",
        key: process.env.SIM_KEY || "eaf1c060-e052-4e47-989f-546bae38f986"
    },
    prefix: process.env.PREFIX || "!",
    ownerBotRole: [constants.MANAGE_CHANNELS],
    activity: process.env.BOT_ACTIVITY || "",
    multiChannel: process.env.MULTI_CHANNEL || true
}

