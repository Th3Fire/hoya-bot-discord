// require('dotenv').config()

module.exports = {
    feature: {
        ANNOUNCE_DEL_MSG: false,
        ANNOUNCE_EDIT_MSG: false,
        ANNOUNCE_USER_UPDATE: false,
        ANNOUNCE_CHANNEL_UPDATE: false,
        ANNOUNCE_USER_LEAVE: false,
        ANNOUNCE_USER_JOIN: true,
        ENABLE_SIMSIMI_BOT: true,
    },
    token: process.env.BOT_TOKEN || "",
    prefix: process.env.PREFIX || "!",
    activity: process.env.BOT_ACTIVITY || "",
    multiChannel: process.env.MULTI_CHANNEL || "N",
    botChannelName: process.env.CHANNEL_NAME || "chat-bot",
    simsimiOption: {
        SIM_COUNTRY: process.env.SIM_COUNTRY || ["TH"],
        SIM_LC: process.env.SIM_LC || "th",
        SIM_KEY: process.env.SIM_KEY || "",
        SIM_BAD_PROB_MAX: process.env.SIM_BAD_PROB_MAX || '1.0',
        SIM_BAD_PROB_MIN: process.env.SIM_BAD_PROB_MIN || '0.0'
    },
}

