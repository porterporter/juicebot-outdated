require('dotenv').config();
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(process.env.hypixel_token);
const Discord = require('discord.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

module.exports = {
	name: 'stats',
	description: 'retrieve hypixel stats',
	execute(message, args) {
		const name = args[0];
		hypixel.getPlayer(name, { guild: true }).then(async (player) => {
			const game = player.stats;
			const embed = new Discord.MessageEmbed();
			if (player.isOnline != false) {
				embed.setColor('#51eb39');
				embed.setFooter('User is currently online');
			}
			else {
				embed.setColor('#eb3939');
				embed.setFooter('User is currently offline');
			}
			if(args[1]) {
			switch (args[1]) {
				case 'skywars':
				case 'sw':
					embed.setAuthor(player.nickname);
					embed.setDescription('Skywars Stats');
					embed.addField('Total Games', game.skywars.playedGames, true);
					embed.addField('Wins', game.skywars.wins, true);
					embed.addField('Kills', game.skywars.kills, true);
					embed.addField('Coins', game.skywars.coins, true);
					embed.addField('Tokens', game.skywars.tokens, true);
					embed.addField('Level', game.skywars.levelFormatted, true);
					embed.addField('KDR', game.skywars.KDRatio, true);
					embed.addField('Heads', game.skywars.heads, true);
					embed.addField('Souls', game.skywars.souls, true);
					embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
					break;

				case 'bedwars':
				case 'bw':
					embed.setAuthor(player.nickname);
					embed.setDescription('Bedwars Stats');
					embed.addField('Total Games', game.bedwars.playedGames, true);
					embed.addField('Wins', game.bedwars.wins, true);
					embed.addField('Kills', game.bedwars.kills, true);
					embed.addField('Final Kills', game.bedwars.finalKills, true);
					embed.addField('Coins', game.bedwars.coins, true);
					embed.addField('Level', game.bedwars.level, true);
					embed.addField('KDR', game.bedwars.KDRatio, true);
					embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
					break;
				default:
					return message.channel.send({ embed: { color: '#ff8c00', description: '**LIST OF AVAILABLE MINIGAMES:**\nskywars, sw\nbedwars, bw\n**DUELS COMING SOON**', footer: '' } });
			}
}
else {
					embed.setAuthor('[' + player.rank + ']' + ' ' + player.nickname);
					embed.addField('Level', player.level, true);
					if (player.guild) {
						embed.addField('Guild', `[${player.guild.name}](${encodeURI(`https://plancke.io/hypixel/guild/name/${player.guild.name}`)})`, true);
					}
					embed.addField('Achievement Points', player.achievementPoints.toLocaleString(), true);
					embed.addField('Karma', player.karma.toLocaleString(), true);
					if (player.isOnline) {
						const elapsed = dayjs.duration(Date.now() - player.lastLogin).format('H[h] m[m] s[s]');
						embed.addField('Network status', `Online for ${elapsed}`, true);
					}
 else if (!player.isOnline) {
						embed.addField('Last Login', `${dayjs(player.lastLogin).fromNow()}`, true);
					}
					embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
			}

			message.channel.send({ embed });

		}).catch(e => {
			console.log(e);
			return message.reply('There was an error running this command!```USAGE: >stats <Username> (Optional: Gamemode)\n>stats njon skywars```');


		});
	},
};