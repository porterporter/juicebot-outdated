module.exports = {
	name: 'kick',
	description: 'Kick the specified user for a specified reason.',
	usage: '<mention> [reason]',
	category: 'Moderation',
	args: true,
	guildOnly: true,
	permission: 'KICK_MEMBERS',
	execute(message, args) {
		const member = message.guild.member(message.mentions.users.first());
		if (member && !args[1]) {
			member
				.kick()
				.then(() => {
					message.reply(`✅ Succesfuly kicked ${member.user.tag}.`);
				})
				.catch((err) => {
					message.channel.send(
						`❌ I was unable to kick the user ${member.user.tag}.`
					);
					console.log(err);
				});
			} else if (member && args[1]) {
			let msgArgs = args.slice(1).join(' ');
			member
				.kick(msgArgs)
				.then(() => {
					message.reply(
						`✅ Succesfuly kicked ${member.user.tag} for '${msgArgs}'.`
					);
				})
				.catch((err) => {
					message.channel.send(
						`❌ I was unable to kick  the user ${member.user.tag}.`
					);
					console.log(err);
				});
			} else {
			message.channel.send(`❌ Requested user not found.`);
		}
	},
};
