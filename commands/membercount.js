module.exports = {
	name: 'membercount',
	description: 'Displays membercount of server',
	execute(message) {
		message.channel.send({ embed: { color: '#92cded', title: `Members: \`${message.guild.memberCount}\`` } });
	},
};