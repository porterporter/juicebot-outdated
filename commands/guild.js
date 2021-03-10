const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(process.env.hypixel_token);
const Discord = require('discord.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

module.exports = {
  name: 'guild',
  description: 'retrieve hypixel guild stats',
  execute(message, args) {
        const input = args.slice(1).join(' ');

        const embed = new Discord.MessageEmbed;
    switch (args[0]) {
      case 'name':
        hypixel.getGuild('name', input).then(guild => {
          const createdAt = dayjs(guild.createdAtTimestamp).format('LLL');
          const gexp = guild.experience;
          const gmembers = (guild.members).length;
          const planckeURL = ('https://plancke.io/hypixel/guild/name/' + encodeURIComponent(guild.name));

          embed.setAuthor(guild.name);
          embed.setDescription('Guild Stats');
          embed.setColor('#ff8c00');
          embed.addField('Tag', guild.tag, true);
          embed.addField('Level', getLevel(gexp), true);
          if (guild.description) embed.addField('Description', guild.description, true);
          embed.addField('Guild EXP', gexp, true);
          if ((guild.preferredGames).length > 3) { embed.addField('Games', (guild.preferredGames).length, true); }
          else { embed.addField('Games', guild.preferredGames, true) }
          embed.addField('Creation Date', createdAt, true);
          embed.addField('Members', `[${gmembers}](${planckeURL})`, true);
          embed.addField('Joinable', guild.joinable, true);
          embed.addField('Publicly Listed', guild.publiclyListed, true);

          message.channel.send({ embed: embed });
        }).catch(e => {
          console.error(e);
          return message.channel.send({ embed: { color: '#eb3939', description: 'Error! Is this a valid guild name?' } });

        });
        break;

      case 'player':
        hypixel.getGuild('player', input).then(guild => {
          const createdAt = dayjs(guild.createdAtTimestamp).format('LLL');
          const gexp = guild.experience;
          const gmembers = (guild.members).length;
          const planckeURL = ('https://plancke.io/hypixel/guild/name/' + encodeURIComponent(guild.name));

          embed.setAuthor(guild.name);
          embed.setDescription('Guild Stats');
          embed.setColor('#ff8c00');
          embed.addField('Tag', guild.tag, true);
          embed.addField('Level', getLevel(gexp), true);
          if (guild.description) embed.addField('Description', guild.description, true);
          embed.addField('Guild EXP', gexp, true);
          if ((guild.preferredGames).length > 3) { embed.addField('Games', (guild.preferredGames).length, true); }
          else { embed.addField('Games', guild.preferredGames, true) }
          embed.addField('Creation Date', createdAt, true);
          embed.addField('Members', `[${gmembers}](${planckeURL})`, true);
          embed.addField('Joinable', guild.joinable, true);
          embed.addField('Publicly Listed', guild.publiclyListed, true);

          message.channel.send({ embed: embed });
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

function getLevel(exp) {
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
    }
    else { need = EXP_NEEDED[i]; }

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
}