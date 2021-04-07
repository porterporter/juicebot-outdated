const fetch = require('node-fetch');
const { MessageEmbed, Util } = require('discord.js');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

const { getNameHistory } = require('../utils/utils');

module.exports = {
    name: 'player',
    description: 'Diplays player\'s name, uuid, skin, cape and name history',
    args: '<uuid>',
    async execute(message, args) {
        try {
            const req = await fetch(`https://api.ashcon.app/mojang/v2/user/${args[0]}`);
            const data = await req.json();
            const nameHistory = getNameHistory(data);
            const embed = new MessageEmbed()
                .setColor('#ff8c00')
                .setAuthor(`Player Info`)
                .addFields(
                    { name: 'Username', value: data.username, inline: false },
                    { name: 'UUID', value: (data.uuid).replace(/-/g, ''), inline: false },
                );
            if (data.created_at) { embed.addField('Created At', dayjs(data.created_at).format('LL'), false); }
                embed.addField('Username History', Util.escapeMarkdown(nameHistory), false);
            embed.setImage(`https://visage.surgeplay.com/full/${data.uuid}`);
            message.channel.send({ embed });
        }
 catch (e) {
    message.channel.send({ embed: { color: '#eb3939', description: 'There was an error running this command! **USAGE:** *>player juiceboyy*' } });
     return console.log(`${'[ERROR] There was an error running player.js\n'}${e}`);
        }
} };