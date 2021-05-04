module.exports = {
	name: 'invite',
	description: 'sends the bot invite link',
	execute(message) {
		const embed = {
			color: '#92cded',
			description: 'invite me to your server!\n\nhttps://discord.com/invite/f3DJdKN/',
		};
		message.channel.send({ embed: embed });
	},
};
