module.exports = {
	name: 'say',
	description: 'say',
	permission: 'MANAGE_MESSAGES',
	execute(message, args) {
		message.delete();
		message.channel.send(args.join(' '));
	},
};
