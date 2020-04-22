const ytdl = require('ytdl-core-discord')
const yts = require( 'yt-search' )

async function play(connection, url) {
    connection.play(await ytdl(url), { type: 'opus', highWaterMark: 50, volume: 0.15 });
}

module.exports = {
	name: 'play',
	guildOnly: true,
    description: 'เล่นเพลงจาก Youtube',
    args: true,
    aliases: ['เล่น'],
	usage: '[ชื่อเพลง]',
    cooldown: 5,
	async execute(message, args) {
        message.channel.send(`กำลังค้นหา \`${args}\``)
        console.info('searching... ', args)
        try {
            const searchText = args.join(' ')
            const connection = await message.member.voice.channel.join()
            const { videos } = await yts(searchText)
            const { url, title: videoTitle, image } = videos[0]

            play(connection, url)
            console.info('playing... ', videoTitle, ' url: ', url)

            const exampleEmbed = {
                color: '#FF0000',
                title: videoTitle,
                url: url,
                author: {
                    name: 'Youtube',
                    icon_url: 'http://pngimg.com/uploads/youtube/youtube_PNG2.png',
                    url: 'https://www.youtube.com/',
                },
                thumbnail: {
                    url: image,
                },
            }
            return message.channel.send({ embed: exampleEmbed })
        } catch (error) {
            return console.error(error)
        }
	},
}