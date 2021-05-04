module.exports = {
	name: 'icon',
	description: 'Display the servers membercount',
	execute(message) {
		message.channel.send({ embed: { color: '#92cded', image: { url: message.guild.iconURL() }, title: message.guild.name } });
	},
};