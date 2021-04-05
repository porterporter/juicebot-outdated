const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'embed',
	description: 'leave the server',
	permission: '',
	guildOnly: true,
	execute(message) {
		const embed = new MessageEmbed()
		.setColor('#92cded')
		.setDescription('+ don\'t be dumb\n+ be smart with pings\n+ no harrassment, sexism, racism, homophobia, transphobia\n+ be respectful to the other people\n+self promo in <#811063061850750996>');
		message.channel.send(embed);
	},
};
