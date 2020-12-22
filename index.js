require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
  let users;
  let guilds;
  client.users.cache.tap((coll) => (users = coll.size));
  client.guilds.cache.tap((coll) => (guilds = coll.size));
  const status = [
    {
      activity: 'created by juiceboy#0001',
    },
    //{
    //  activity: `${users} users in ${guilds} servers.`,
   //   type: 'WATCHING',
   // },
    {
	url: 'https://www.twitch.tv/juiceboylive',
	type: 'STREAMING',
    },
    {
      activity: 'Minecraft',
      type: 'PLAYING',
    },
    {
      activity: 'visit porter.moe!',
    },
    {
      activity: 'add this bot to your server! bot.porter.moe',
    },
  ];
  let random = status[Math.floor(Math.random() * Math.floor(status.length))];
  client.user.setActivity(random.activity, {
    type: random.type,
  });
  setInterval(async function() {
    client.users.cache.tap((coll) => (users = coll.size));
    client.guilds.cache.tap((coll) => (guilds = coll.size));
    random = status[Math.floor(Math.random() * Math.floor(status.length))];
    client.user.setActivity(random.activity, {
      type: random.type,
    });
  }, 60000);
});


client.on('ready', () => {
	client.user.setActivity('visit porter.moe', {
		type: 'STREAMING',
		url: 'https://www.twitch.tv/juiceboylive',
	});
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	if (command.permission) {
    if (
      !message.guild.member(message.author).hasPermission(command.permission)
    ) {
      return message.reply(
        `You don't have permission to do that!\nYou need to be able to \`${command.permission}\` to run this command.`,
      );
    }
  }

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
 catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
