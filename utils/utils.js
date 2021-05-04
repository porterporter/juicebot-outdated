/* eslint-disable prefer-template */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
require('discord.js');

module.exports = {
	getRoleMap: function(message) {
		let rolemap = message.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(r => r)
			.join(',');
		if (rolemap.length > 1024) rolemap = 'To many roles to display';
		return rolemap;
	},
	getUserRoleMap: function(member) {
		let rolemap = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(r => r)
			.join(',');
		if (rolemap.length > 1024) rolemap = 'To many roles to display';
		return rolemap;
	},
	getNameHistory: function(data) {
		let nameHistory = '';
		data.username_history.forEach(element => {
			nameHistory += `${element.username}\n`;
		});
		return nameHistory;
	},
	getStatuses: function(user) {
		let statuses = '';
		user.presence.activities.forEach(activity => {

			if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {
				statuses = statuses + `- ${activity.name}: \`${activity.state.replace(/;/g, ',')} - ${activity.details}\` - [LISTEN](https://open.spotify.com/track/${activity.syncID})\n`;
			} else if (activity.type === 'PLAYING') {
				statuses = statuses + `- ${activity.name}: \`${activity.details || ''} - ${activity.state || ''}\`\n`;
			} else {
				statuses = statuses + `- ${activity.name}: \`${activity.state || activity.details}\`\n`;
			}
		});
		return statuses;
	},
	genBar: function(num) {
		const str = (num / 5).toString();
		const digit = Math.floor(str);
		const filler = 20 - digit;
		const bar = `[ ${'■ '.repeat(digit)}${'□ '.repeat(filler)}]`;
		return bar;
	},
	levelCalculator: function(stats) {
		const killsPerWin = stats.kills / stats.wins;
		const needed = stats.levelProgress.xpToNextLevel;
		const wins = needed / (10 + killsPerWin);
		const kills = wins * killsPerWin;
		const calc = { wins: Math.ceil(wins), kills: Math.ceil(kills), killsPerWin: killsPerWin };
		return calc;
	},
	getLevel: function(exp) {
		const EXP_NEEDED = [
			100000,
			150000,
			250000,
			500000,
			750000,
			1000000,
			1250000,
			1500000,
			2000000,
			2500000,
			2500000,
			2500000,
			2500000,
			2500000,
			3000000,
		];

		let level = 0;

		// Increments by one from zero to the level cap
		for (let i = 0; i <= 1000; i += 1) {
			// need is the required exp to get to the next level
			let need = 0;
			if (i >= EXP_NEEDED.length) {
				need = EXP_NEEDED[EXP_NEEDED.length - 1];
			} else { need = EXP_NEEDED[i]; }

			// If the required exp to get to the next level isn't met returns
			// the current level plus progress towards the next (unused exp/need)
			// Otherwise increments the level and substracts the used exp from exp var
			if ((exp - need) < 0) {
				return Math.round((level + (exp / need)) * 100) / 100;
			}
			level += 1;
			exp -= need;
		}

		// Returns the level cap - currently 1000
		// If changed here, also change in for loop above
		return 1000;
	},
};