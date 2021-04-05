module.exports = {
	name: 'avatar',
	description: 'avatar of a user',
	execute(message) {
		const user = message.mentions.users.first() || message.author;
		return message.channel.send(
			{
				embed: {
					title: `${user.username}'s Avatar`,
					color: '#51eb39',
					image: {
						url: user.displayAvatarURL(
							{ format: 'png' },
							{ dynamic: true }),
					},
				},
			},
		);
	},
};