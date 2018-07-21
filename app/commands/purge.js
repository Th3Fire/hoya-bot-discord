exports.run = async (client, message, args) => {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("โปรดระบุตัวเลขระหว่าง 2 ถึง 100 เพื่อลบข้อความ");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({ limit: deleteCount });
    message.channel.bulkDelete(fetched).catch(error => message.reply(`ไม่สามารถลบข้อความได้เนื่องจาก: ${error}`));

}
