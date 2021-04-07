const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'membercount',
	description: 'Display the servers membercount',
	execute(message) {
		message.channel.send({ embed: { color: '#92cded', image: {
			url: message.guild.iconURL(), }, title: `Server icon of \`${message.guild.memberCount}\``}});
	}
};