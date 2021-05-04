require('dotenv').config();

const paginationEmbed = require('discord.js-pagination');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');

dayjs.extend(duration);
dayjs.extend(relativeTime);

const hypixel = require('../utils/hypixel.js');
const { genBar, levelCalculator } = require('../utils/utils');


module.exports = {
	name: 'sw',
	description: 'retrieve sw stats',
	execute(message, args) {
		const name = args[0];
		message.channel.startTyping();
		hypixel.getPlayer(name, { guild: true }).then(async (player) => {
			const skywars = player.stats.skywars;

			// online/offline status (in time)
			let embedColor = '';
			let footer = '';
			if (player.isOnline) {
				embedColor = '#51eb39';
				footer = (`Online for ${dayjs(player.lastLoginTimestamp).fromNow(true)}`);
			} else {
				embedColor = '#eb3939';
				footer = (`Last online ${dayjs(player.lastLogoutTimestamp).fromNow()}`);
			}

			const thumbnail = (`http://cravatar.eu/helmhead/${name}.png`);

			let nameFormatted = '';
			if (player.rank !== 'Default')
				nameFormatted = (`[${player.rank}] **${player.nickname}**`);
			else
				nameFormatted = (`** ${player.nickname} **`);

			const calc = levelCalculator(skywars);

			const swStats = {
				title: 'Skywars Stats',
				color: embedColor,
				description: nameFormatted,
				thumbnail: { url: thumbnail },
				fields: [
					{ name: 'Level', value: skywars.levelFormatted, inline: true },
					{ name: 'Prestige', value: skywars.prestige, inline: true },
					{ name: 'Corruption Chance', value: `${skywars.angelOfDeathLevel}%`, inline: true },

					{ name: 'Kills', value: skywars.kills.toLocaleString(), inline: true },
					{ name: 'Deaths', value: skywars.deaths.toLocaleString(), inline: true },
					{ name: 'KDR', value: skywars.KDRatio.toLocaleString(), inline: true },

					{ name: 'Wins', value: skywars.wins.toLocaleString(), inline: true },
					{ name: 'Losses', value: skywars.losses.toLocaleString(), inline: true },
					{ name: 'WLR', value: skywars.WLRatio.toLocaleString(), inline: true },

					{ name: 'Coins', value: skywars.coins.toLocaleString(), inline: true },
					{ name: 'Heads', value: skywars.heads.toLocaleString(), inline: true },
					{ name: 'Souls', value: skywars.souls.toLocaleString(), inline: true }],
				footer: { text: footer },
			};
			const levelingStats = {
				title: 'Leveling Progress',
				description: `[${skywars.levelFormatted}] **${player.nickname}**`,
				color: embedColor,
				thumbnail: { url: thumbnail },
				fields: [
					{ name: 'Current Level', value: skywars.level, inline: true },
					{ name: 'Next Level', value: Math.floor(skywars.level) + 1, inline: true },
					{ name: 'Average Kills Per Win', value: calc.killsPerWin.toFixed(3), inline: true },

					{ name: 'Wins Needed', value: calc.wins.toLocaleString(), inline: true },
					{ name: 'Kills Needed', value: calc.kills.toLocaleString(), inline: true },
					{ name: 'XP Needed', value: `${skywars.experience.toLocaleString()} / ${skywars.levelProgress.xpNextLevel.toLocaleString()}`, inline: true },

					{ name: `Estimated Wins At Level ${Math.floor(skywars.level) + 1}`, value: `${(skywars.wins + calc.wins).toLocaleString()} (+ ${calc.wins.toLocaleString()})`, inline: true },
					{ name: `Estimated Kills At Level ${Math.floor(skywars.level) + 1}`, value: `${(skywars.kills + calc.kills).toLocaleString()} (+ ${calc.kills.toLocaleString()})`, inline: true },

					{ name: 'Level Progress', value: genBar(skywars.levelProgress.percent), inline: false }],
				footer: { text: footer },
			};
			const swStatsSOLO = {
				title: 'Skywars Solo Stats',
				color: embedColor,
				description: nameFormatted,
				thumbnail: { url: thumbnail },
				fields: [
					{ name: 'Kills', value: skywars.solo.overall.kills.toLocaleString(), inline: true },
					{ name: 'Deaths', value: skywars.solo.overall.deaths.toLocaleString(), inline: true },
					{ name: 'KDR', value: skywars.solo.overall.KDRatio.toLocaleString(), inline: true },

					{ name: 'Wins', value: skywars.solo.overall.wins.toLocaleString(), inline: true },
					{ name: 'Losses', value: skywars.solo.overall.losses.toLocaleString(), inline: true },
					{ name: 'WLR', value: skywars.solo.overall.WLRatio.toLocaleString(), inline: true },

					{ name: 'Played Games', value: skywars.solo.overall.playedGames.toLocaleString(), inline: true } ],
				footer: { text: footer },
			};
			const swStatsTEAMS = {
				title: 'Skywars Teams Stats',
				color: embedColor,
				description: nameFormatted,
				thumbnail: { url: thumbnail },
				fields: [
					{ name: 'Kills', value: skywars.team.overall.kills.toLocaleString(), inline: true },
					{ name: 'Deaths', value: skywars.team.overall.deaths.toLocaleString(), inline: true },
					{ name: 'KDR', value: skywars.team.overall.KDRatio.toLocaleString(), inline: true },

					{ name: 'Wins', value: skywars.team.overall.wins.toLocaleString(), inline: true },
					{ name: 'Losses', value: skywars.team.overall.losses.toLocaleString(), inline: true },
					{ name: 'WLR', value: skywars.team.overall.WLRatio.toLocaleString(), inline: true },

					{ name: 'Played Games', value: skywars.team.overall.playedGames.toLocaleString(), inline: true } ],
				footer: { text: footer },
			};
			const swStatsMEGA = {
				title: 'Skywars Mega Stats',
				color: embedColor,
				description: nameFormatted,
				thumbnail: { url: thumbnail },
				fields: [
					{ name: 'Kills', value: skywars.mega.overall.kills.toLocaleString(), inline: true },
					{ name: 'Deaths', value: skywars.mega.overall.deaths.toLocaleString(), inline: true },
					{ name: 'KDR', value: skywars.mega.overall.KDRatio.toLocaleString(), inline: true },

					{ name: 'Wins', value: skywars.mega.overall.wins.toLocaleString(), inline: true },
					{ name: 'Losses', value: skywars.mega.overall.losses.toLocaleString(), inline: true },
					{ name: 'WLR', value: skywars.mega.overall.WLRatio.toLocaleString(), inline: true },

					{ name: 'Played Games', value: skywars.mega.overall.playedGames.toLocaleString(), inline: true } ],
				footer: { text: footer },
			};
			/* - RANKED SKYWARS IS ON HOLD FOR RIGHT NOW, GOTTA MAKE IT SOUND GOOD FIRST -
			const swStatsRANKED = {
				title: 'Skywars Solo Stats',
				color: embedColor,
				description: nameFormatted,
				thumbnail: { url: thumbnail },
				fields: [
					{ name: 'Kills', value: skywars.ranked.kills.toLocaleString(), inline: true },
					{ name: 'Deaths', value: skywars.ranked.deaths.toLocaleString(), inline: true },
					{ name: 'KDR', value: skywars.ranked.KDRatio.toLocaleString(), inline: true },

					{ name: 'Wins', value: skywars.ranked.wins.toLocaleString(), inline: true },
					{ name: 'Losses', value: skywars.ranked.losses.toLocaleString(), inline: true },
					{ name: 'WLR', value: skywars.ranked.WLRatio.toLocaleString(), inline: true },

					{ name: 'Ranked Ratings', value: skywars.ranked.ratings, inline: true },


					{ name: 'Played Games', value: skywars.ranked.playedGames.toLocaleString(), inline: false } ],
				footer: { text: footer },
			};
			*/
			const pages = [{ embed: swStats }, { embed: levelingStats }, { embed: swStatsSOLO }, { embed: swStatsTEAMS }, { embed: swStatsMEGA } ];
			paginationEmbed(message, pages, ['⬅', '➡'], 60000);
		}).catch(e => {
			console.log(`[ERROR] There was an error running sw.js\n${e}`);
			return message.channel.send({ embed: { color: '#eb3939', description: 'There was an error running this command! Did you type in the player name correctly?' } });
		});

		message.channel.stopTyping();

	},
};

