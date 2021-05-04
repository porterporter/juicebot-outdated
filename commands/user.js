const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const { getUserRoleMap, getStatuses } = require('../utils/utils');
const paginationEmbed = require('discord.js-pagination');


dayjs.extend(relativeTime);

module.exports = {
	name: 'user',
	description: 'user info',
	execute(message) {
		const user = message.guild.member(message.mentions.users.first()) || message.member;
		const page1 = {
			color: '#92cded',
			author: { name: `${user.displayName} (${user.user.tag})`, icon_url: user.user.displayAvatarURL({ format: 'png' }, { dynamic: true }) },
			title: 'Account Info',
			fields: [
				{ name: 'Account Created', value: dayjs(user.user.createdTimestamp).format('LLL'), inline: false } ],
			footer: { text: user.id },
		};
		const page2 = {
			color: '#92cded',
			author: { name: `${user.displayName} (${user.user.tag})`, icon_url: user.user.displayAvatarURL({ format: 'png' }, { dynamic: true }) },
			title: 'Account Info',
			fields: [
				{ name: 'Server Join', value: `${dayjs(user.joinedTimestamp).format('LLL')}`, inline: false },
				{ name: 'Roles', value: getUserRoleMap(user), inline: false } ],
			footer: { text: user.id },
		};
		if(user.presence.activities[0]) {
			const statuses = getStatuses(user);
			page1.fields[2] = { name: 'Status', value: statuses, inline: false };
		}
		const pages = [{ embed: page1 }, { embed: page2 } ];
		return paginationEmbed(message, pages, ['⬅', '➡'], 30000);

	} };