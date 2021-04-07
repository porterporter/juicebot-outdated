module.exports = {
	name: 'prune',
	description: 'delete messages',
	permission: 'MANAGE_MESSAGES',
	guildOnly: true,

	execute(message, args) {
		const amount = parseInt(args[0], 10) + 1;

		if (Number.isNaN(amount)) {
			return message.channel.send({ embed: { color: '#eb3939', description: 'That doesn\'t seem to be a valid number.' } });
		}
		if (amount <= 1 || amount > 100) {
			return message.channel.send({ embed: { color: '#eb3939', description: 'You need to input a number between 1 and 99.' } });
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.log(`[ERROR] There was an error running prune.js\n${err}`);
			return message.channel.send({ embed: { color: '#eb3939', description: 'There was an error trying to prune messages in this channel!' } });
		});
	},
};
