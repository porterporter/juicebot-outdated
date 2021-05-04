const { genBar } = require('../utils/utils');
const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);
const hypixel = require('../utils/hypixel.js');
const { getLevel } = require('../utils/utils');

module.exports = {
	name: 'guild',
	description: 'retrieve hypixel guild stats',
	execute(message, args) {
		const input = args.slice(1).join(' ');

		const embed = new MessageEmbed;
		switch (args[0]) {
		case 'name':
			hypixel.getGuild('name', input).then(guild => {
				const createdAt = dayjs(guild.createdAtTimestamp).format('LL');
				const gexp = guild.experience;
				const gmembers = (guild.members).length;
				const planckeURL = (`https://plancke.io/hypixel/guild/name/${encodeURIComponent(guild.name)}`);
				embed.setAuthor('Guild Stats');
				embed.setDescription(`Guild Name: **${guild.name}**`);
				embed.setColor('#ff8c00');
				if(guild.tag)
					embed.addField('Tag', guild.tag, true);
				embed.addField('Level', getLevel(gexp), true);
				if (guild.description) embed.addField('Description', guild.description, true);
				embed.addField('Guild EXP', gexp.toLocaleString(), true);
				if (guild.preferredGames)
					if ((guild.preferredGames).length > 3) embed.addField('Games', (guild.preferredGames).length, true);
					else embed.addField('Games', guild.preferredGames, true);
				embed.addField('Creation Date', createdAt, true);
				embed.addField('Members', `[${gmembers}](${planckeURL})`, true);
				embed.addField('Joinable', guild.joinable, true);
				embed.addField('Publicly Listed', guild.publiclyListed, true);
				embed.addField('Level Progress', genBar(getLevel(gexp).toString().slice(-2)), false);

				message.channel.send({ embed });
			}).catch(e => {
				console.error(e);
				return message.channel.send({ embed: { color: '#eb3939', description: 'Error! Is this a valid guild name?' } });

			});
			break;

		case 'player':
			hypixel.getGuild('player', input).then(guild => {
				const createdAt = dayjs(guild.createdAtTimestamp).format('LL');
				const gexp = guild.experience;
				const gmembers = (guild.members).length;
				const planckeURL = (`https://plancke.io/hypixel/guild/name/${encodeURIComponent(guild.name)}`);
				embed.setAuthor('Guild Stats');
				embed.setDescription(`Guild Name: **${guild.name}**`);
				embed.setColor('#ff8c00');
				if(guild.tag)
					embed.addField('Tag', guild.tag, true);
				embed.addField('Level', getLevel(gexp), true);
				if (guild.description) embed.addField('Description', guild.description, true);
				embed.addField('Guild EXP', gexp.toLocaleString(), true);
				if (guild.preferredGames)
					if ((guild.preferredGames).length > 3) embed.addField('Games', (guild.preferredGames).length, true);
					else embed.addField('Games', guild.preferredGames, true);
				embed.addField('Creation Date', createdAt, true);
				embed.addField('Members', `[${gmembers}](${planckeURL})`, true);
				embed.addField('Joinable', guild.joinable, true);
				embed.addField('Publicly Listed', guild.publiclyListed, true);
				embed.addField('Level Progress', genBar(getLevel(gexp).toString().slice(-2)), false);

				message.channel.send({ embed });

			}).catch(e => {
				console.error(e);
				return message.channel.send({ embed: { color: '#eb3939', description: 'Error! Is the player in a guild?' } });

			});
			break;
		default:
			message.channel.send({ embed: { color: '#eb3939', description: 'USAGE: *>guild player juiceboyy* **OR** *>guild name juicyboys*' } });

			break;
		}

	},
};
