const { MessageEmbed } = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const utils = require('./utils');

module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(message) {
		const textChannels = message.guild.channels.cache
			.filter(ch => ch.deleted == false && ch.type === 'text');

		const voiceChannels = message.guild.channels.cache
			.filter(ch => ch.deleted == false && ch.type === 'voice');

		const stats1 = new MessageEmbed()
			.setTitle(message.guild.name)
			.setColor('#92cded')
			.setThumbnail(message.guild.iconURL())
			.setDescription(`**Total Members:** ${message.guild.memberCount}\n**Guild Owner:** ${message.guild.owner}\n**Roles:** ${message.guild.roles.cache.size}\n**Channels:** 💬 ${textChannels.size} 🔊 ${voiceChannels.size}`)
			.setFooter(message.guild.id);

		const stats2 = new MessageEmbed()
			.setTitle(message.guild.name)
			.setColor('#92cded')
			.setThumbnail(message.guild.iconURL())
			.setDescription(`**Region:** \`${message.guild.region}\`\n**Created At:** ${dayjs(message.guild.createdTimestamp).format('LLL')}\n**Roles: ** ${utils.getRoleMap(message)}`)
			.setFooter(message.guild.id);


		const pages = [
			stats1,
			stats2,
		];

		paginationEmbed(message, pages);
	},
};