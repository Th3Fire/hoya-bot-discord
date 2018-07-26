const constants = require('./constants')
const { key } = require('./key/sim-key.json')

module.exports = {
    token: process.env.BOT_TOKEN || "NDY5NTA4MzM2NDIxOTYxNzM4.DjjpkA.ooptyyhWGrJn4cVm_KxA4mIvLT8",
    mainChannelIDChatbot: process.env.DISCORD_CHANNEL_ID || "362987223454449665",
    simsimiOption: {
        lc: process.env.SIM_LC || "th",
        ft: process.env.SIM_FT || "0.0",
        key: process.env.SIM_KEY || key || ""
    },
    prefix: process.env.PREFIX || "!",
    ownerBotID: process.env.OWNER_BOT_ID || "",
    activity: process.env.BOT_ACTIVITY || "",
    multiChannel: process.env.MULTI_CHANNEL || true
}

