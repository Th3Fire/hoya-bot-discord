// require('dotenv').config()

module.exports = {
    feature: {
        ANNOUNCE_DEL_MSG: process.env.ANNOUNCE_DEL_MSG,
        ANNOUNCE_EDIT_MSG: process.env.ANNOUNCE_EDIT_MSG,
        ANNOUNCE_USER_UPDATE: process.env.ANNOUNCE_USER_UPDATE,
        ANNOUNCE_CHANNEL_UPDATE: process.env.ANNOUNCE_CHANNEL_UPDATE,
        ANNOUNCE_USER_LEAVE: process.env.ANNOUNCE_USER_LEAVE,
        ANNOUNCE_USER_JOIN: process.env.ANNOUNCE_USER_JOIN,
        ENABLE_SIMSIMI_BOT: process.env.ENABLE_SIMSIMI_BOT,
        ENABLE_TRANSLATION: process.env.ENABLE_TRANSLATION,
    },
    token: process.env.BOT_TOKEN,
    prefix: process.env.PREFIX,
    activity: process.env.BOT_ACTIVITY,
    multiChannel: process.env.MULTI_CHANNEL,
    botChannelName: process.env.CHANNEL_NAME,
    simsimiOption: {
        SIM_LC: process.env.SIM_LC,
        SIM_KEY: process.env.SIM_KEY,
        SIM_BAD_PROB_MAX: process.env.SIM_BAD_PROB_MAX,
        SIM_BAD_PROB_MIN: process.env.SIM_BAD_PROB_MIN,
    },
}

