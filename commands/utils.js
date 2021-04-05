require('discord.js');
module.exports = {
    getRoleMap: function(message) {
    let rolemap = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(',');
if (rolemap.length > 1024) rolemap = 'To many roles to display';
    return rolemap;
    },
    getNameHistory: function(data) {
        let nameHistory = '';
            data.username_history.forEach(element => {
                nameHistory += element.username + '\n';
            });
            return nameHistory;
    },
};