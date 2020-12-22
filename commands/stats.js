const mojang = require('mojang-api');
const Discord = require('discord.js');


module.exports = {
    name: 'stats',
    description: 'pulls hypixel stats from paniek.de',
    args: '<nickname>',
    execute(message, args) {
        if(!args.length) {
            message.reply('please specify the player\'s name');
            return;
        }
        mojang.nameToUuid(args[0], (err, resp) => {
          try {
            const embed = new Discord.MessageEmbed()
          .setColor('#ffe100')
          .setTitle('Stats For ' + args[0])
          .setImage('https://hypixel.paniek.de/signature/' + resp[0].id + '/general-tooltip');
          message.channel.send({ embed });
}
 catch (e) {
  console.error(e);
  message.reply('The player you specified doesn\'t exist or hasn\'t joined the hypixel network');
}
});
},
};
