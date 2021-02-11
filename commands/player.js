const fetch = require('node-fetch');
const Discord = require('discord.js');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

module.exports = {
    name: 'player',
    description: 'Diplays player\'s name, uuid, skin, cape and name history',
    args: '<uuid>',
    async execute(message, args) {
        const req = await fetch(`https://api.ashcon.app/mojang/v2/user/${args[0]}`);
        const data = await req.json();
        const embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setAuthor('Player Info For: ' + data.username)
            .addFields(
                { name: 'UUID', value: (data.uuid).replace(/-/g, ''), inline: false },
                { name: 'Username', value: data.username, inline: false });

        let nameHistory = '';
        data.username_history.forEach(element => {
            nameHistory += element.username + '\n';
        });
        if (data.created_at) {
            embed.addFields(
                { name: 'Username History', value: nameHistory, inline: false },
                { name: 'Created At', value: dayjs(data.created_at).format('LL'), inline: false });
        }
 else {
            embed.addField('Username History', nameHistory, false);
        }
        embed.setImage(` https://crafatar.com/renders/body/${data.uuid}`);


        message.channel.send({ embed: embed });


    },
};
