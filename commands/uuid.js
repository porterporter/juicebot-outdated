const mojang = require('mojang-api');

module.exports = {
    name: 'uuid',
    description: 'Finds a player\'s uuid from the nickaname',
    args: '<nickname>',
    execute(message, args) {
        if(!args.length) {
            message.reply('please specify the player\'s name');
            return;
        }
        mojang.nameToUuid(args[0], (err, resp) => {
        try {
          message.channel.send(`${resp[0].name}'s uuid is ${resp[0].id}`);
      }
        catch (e) {
          console.error(e);
          message.reply('There was an error!');
        }
      });
      } };
