require('dotenv').config();

const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');

dayjs.extend(duration);
dayjs.extend(relativeTime);

const hypixel = require('../utils/hypixel.js');
const { genBar } = require('../utils/utils');


module.exports = {
    name: 'stats',
    description: 'retrieve hypixel stats',
    execute(message, args) {
        const name = args[0];
        message.channel.startTyping();
        hypixel.getPlayer(name, { guild: true }).then(async (player) => {
            const game = player.stats;
            const embed = new MessageEmbed();

            // online/offline status (in time)
            if (player.isOnline !== false) {
                embed.setColor('#51eb39');
                const elapsed = dayjs.duration(Date.now() - player.lastLogin).locale('en').humanize();
                embed.setFooter(`Online for ${elapsed}`);
            }
            else {
                embed.setColor('#eb3939');
                embed.setFooter(`Last login ${dayjs(player.lastLogin).fromNow()}`);
            }

            embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);

            let nameFormatted = '';
            if (player.rank !== 'Default') {
                nameFormatted = (`[${player.rank}] **${ player.nickname}**`);
            } else {
                nameFormatted = (`** ${player.nickname} **`);
            }

            // search for game type (if any, else, general stats)
            if (args[1]) {
                switch (args[1]) {
                    case 'skywars':
                    case 'sw':
                        embed.setAuthor('Skywars Stats');
                        embed.setDescription(nameFormatted);
                        embed.addFields(
                            { name: 'Level', value: game.skywars.levelFormatted, inline: true },
                            { name: 'Prestige', value: game.skywars.prestige, inline: true },
                            { name: 'Played Games', value: game.skywars.playedGames, inline: true },
                            { name: 'Experience', value: game.skywars.experience, inline: true },
                            { name: 'XP Needed', value: game.skywars.levelProgress.xpToNextLevel, inline: true },
                            { name: 'Percent', value: game.skywars.levelProgress.percent, inline: true },
                            { name: 'Wins', value: game.skywars.wins, inline: true },
                            { name: 'Losses', value: game.skywars.losses, inline: true },
                            { name: 'WLR', value: game.skywars.WLRatio, inline: true },
                            { name: 'Kills', value: game.skywars.kills, inline: true },
                            { name: 'Deaths', value: game.skywars.deaths, inline: true },
                            { name: 'KDR', value: game.skywars.KDRatio, inline: true },
                            { name: 'Coins', value: game.skywars.coins, inline: true },
                            { name: 'Heads', value: game.skywars.heads, inline: true },
                            { name: 'Souls', value: game.skywars.souls, inline: true },
                            { name: 'Level Progress', value: genBar(game.skywars.levelProgress.percent), inline: false });
                            
                        break;

                    case 'bedwars':
                    case 'bw':
                        embed.setAuthor('Bedwars Stats');
                        embed.setDescription(nameFormatted);
                        embed.addFields(
                            { name: 'Level', value: game.bedwars.level, inline: true },
                            { name: 'Prestiege', value: game.bedwars.prestige, inline: true },
                            { name: 'Total Games', value: game.bedwars.playedGames, inline: true },
                            { name: 'Wins', value: game.bedwars.wins, inline: true },
                            { name: 'Losses', value: game.bedwars.losses, inline: true },
                            { name: 'WLR', value: game.bedwars.WLRatio, inline: true },
                            { name: 'Kills', value: game.bedwars.kills, inline: true },
                            { name: 'Deaths', value: game.bedwars.deaths, inline: true },
                            { name: 'KDR', value: game.bedwars.KDRatio, inline: true },
                            { name: 'Final Kills', value: game.bedwars.finalKills, inline: true },
                            { name: 'Beds Broken', value: game.bedwars.beds.broken, inline: true },
                            { name: 'Coins', value: game.bedwars.coins, inline: true },
                        );
                        break;

                    default:
                        return message.channel.send({ embed: { color: '#51eb39', description: '**LIST OF AVAILABLE MINIGAMES:**\nskywars, sw\nbedwars, bw\n**DUELS COMING SOON**', footer: false, thumbnail: false } });
                }
            }
            else {
                const levelString = player.level.toString();
                // UNFINISHED WORK WITH LINKS AND GUILD
                let links = '';
                player.socialMedia.forEach(element => {
                    if(element.link.startsWith('http')) {
                    links += `${element.name} - [Link](${element.link})\n`;
                } else { links += `${element.name} - ${element.link}\n`; }});

                embed.setAuthor('Hypixel Stats');
                embed.setDescription(nameFormatted);
                embed.addFields(
                { name: 'Level', value: player.level, inline: true },
                { name: 'Guild', value: player.guild ? `[${player.guild.name}](${encodeURI(`https://plancke.io/hypixel/guild/name/${player.guild.name}`)})` : 'No Guild', inline: true },
                { name: 'Achievement Points', value: player.achievementPoints.toLocaleString(), inline: true },
                { name: 'Karma', value: player.karma.toLocaleString(), inline: true });
                if(player.socialMedia.length > 0) {embed.addField('Links', links, true); }
                embed.addField('Level Progress', genBar(levelString.slice(-2)), false);
            }
            message.channel.send({ embed });

        }).catch(e => {
            console.log(`[ERROR] There was an error running stats.js\n${e}`);
            return message.channel.send({ embed: { color: '#eb3939', description: 'There was an error running this command! Did you type in the player name correctly?' } });
        });

        message.channel.stopTyping();

    },
};