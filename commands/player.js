const mojang = require('mojang-api');

module.exports = {
    name: 'player',
    description: 'Diplays player\'s name, uuid, skin, cape and name history',
    args: '<uuid>',
    execute(message, args) {
        if(!args.length) {
            message.reply('please specify the player\'s uuid');
            return;
        }
        mojang.profile(args[0], (err, resp) => {
            if(err) {
                message.reply('that player\'s uuid does not exist');
                return;
            }
            mojang.nameHistory(args[0], (err, resp1) => {
                if(err) {
                    message.reply('there was an error trying to retrieve the data');
                    console.error(err);
                    return;
                }

                let nameHistory = '';
                resp1.forEach(element => {
                    nameHistory += element.name + '\n';
                });
                nameHistory = nameHistory.slice(0, nameHistory.length - 2);
                const embedMessage = {
                    color: '#00b300',
                    title: '',
                    author: {
                        name: '>player command',
                        icon_url: '',
                        url: '',
                    },
                    description: '',
                    thumbnail: {
                        url: 'https://crafatar.com/avatars/' + resp.id + '.png',
                    },
                    fields: [{
                        name: 'Name:',
                        value: resp.name,
                    },
                    {
                        name: 'UUID:',
                        value: resp.id,
                    },
                    {
                        name: 'Name history:',
                        value: nameHistory,
                    }],
                    image: {
                        url: 'https://crafatar.com/renders/body/' + resp.id + '.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'juicebot',
                    },
                };
                message.channel.send({ embed: embedMessage });
            });
        });
    },
};
