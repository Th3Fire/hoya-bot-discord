exports.run = async (client, message, args) => {
    message.channel.send('pong!').catch(console.error)
}