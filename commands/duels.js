const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client('INSERT BOT KEY HERE');
const Discord = require('discord.js');

module.exports = {
	name: 'duels',
	description: 'retrieve duels stats',
	execute(message, args) {
		const name = args.join('  ');
    hypixel.getPlayer(name).then(async (player) => {
    if(!player) return;
    const game = player.stats;
    const embed = new Discord.MessageEmbed()
		.setAuthor(player.nickname)
    .setDescription('Duels Stats')
    .addField('Total Games', game.duels.playedGames, true)
    .addField('Wins', game.duels.wins, true)
    .addField('Kills', game.duels.kills, true)
    .addField('Coins', game.duels.coins, true)
    .addField('KDR', game.duels.KDRatio, true)
    .setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
    if (player.isOnline != false) {
      embed.setColor('#51eb39');
      embed.setFooter('User is currently online');
    }
else{
      embed.setColor('#eb3939');
      embed.setFooter('User is currently offline');
    }
    message.channel.send({ embed });
}).catch((err) => {
    console.log(err);
    message.reply('The player you specified doesn\'t exist or hasn\'t joined the hypixel network');
});
},
};
