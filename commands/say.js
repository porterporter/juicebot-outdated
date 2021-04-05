module.exports = {
	name: 'say',
	description: 'say',
	permission: 'MANAGE_MESSAGES',
	guildOnly: true,

	execute(message, args) {
		if(args.length > 0) {
		message.delete();
		message.channel.send(args.join(' '));
	} else { message.reply('Specify a Message!'); }

	},
};
