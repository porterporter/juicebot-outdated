const Discord = require('discord.js');

module.exports = {
	name: 'leave',
	description: 'leave the server',
	permission: 'KICK_MEMBERS',
	execute(message) {
		const embed = new Discord.MessageEmbed()
		.setColor('#92cded')
		.setDescription('Goodbye! :wave::beverage_box: \nIf you ever wish to re-add me or if this was a mistake, [click here!](https://discord.com/oauth2/authorize?client_id=711802256697065505&scope=bot&permissions=604499014)');
		message.channel.send(embed);
		message.guild.leave();
	},
};
