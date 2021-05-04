const paginationEmbed = require('discord.js-pagination');

const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const utils = require('../utils/utils');

module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(message) {

		const textChannels = message.guild.channels.cache
			.filter(ch => ch.deleted === false && ch.type === 'text');

		const voiceChannels = message.guild.channels.cache
			.filter(ch => ch.deleted === false && ch.type === 'voice');

		const stats1 = {
			title: message.guild.name,
			color: '#92cded',
			thumbnail: { url: message.guild.iconURL() },
			description: `**Total Members:** ${message.guild.memberCount}\n**Guild Owner:** ${message.guild.owner}\n**Roles:** ${message.guild.roles.cache.size}\n**Channels:** 💬 ${textChannels.size} 🔊 ${voiceChannels.size}`,
			footer: { text: message.guild.id },
		};

		const stats2 = {
			title: message.guild.name,
			color: '#92cded',
			thumbnail: { url: message.guild.iconURL() },
			description: `**Region:** \`${message.guild.region}\`\n**Created At:** ${dayjs(message.guild.createdTimestamp).format('LLL')} (${dayjs(message.guild.createdTimestamp).fromNow()})\n**Roles: ** ${utils.getRoleMap(message)}`,
			footer: { text: message.guild.id },
		};

		const pages = [
			{ embed: stats1 },
			{ embed: stats2 },
		];
		paginationEmbed(message, pages, ['⬅', '➡'], 15000);
	},
};