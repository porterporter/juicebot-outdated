module.exports = {
	name: 'credits',
	description: 'who made this program',
	execute(message) {
		const embed = {
			color: '#92cded',
			description: 'I was created by `juiceboy#0001`!\nCheck out these links!',
			fields: { name: 'Links', value: '[twitter](https://twitter.com/i/user/1026587028295704576)\n[github](https://github.com/porterporter/)\n[discord server](https://discord.com/invite/f3DJdKN/)\n[bot invite link](https://discord.com/oauth2/authorize?client_id=711802256697065505&scope=bot&permissions=604499014)' },
		};
		message.channel.send({ embed: embed });
	},
};
