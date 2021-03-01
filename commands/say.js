module.exports = {
	name: 'say',
	description: 'say',
	permission: 'MANAGE_MESSAGES',
	guildOnly: true,

	execute(message, args) {
		message.delete();
		message.channel.send(args.join(' '));
	},
};
