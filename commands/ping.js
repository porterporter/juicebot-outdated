module.exports = {
	name: 'ping',
	description: 'Ping!',
    cooldown: 0,
	execute(message, args) {
		const { ws } = message.client;
		message.channel.send(`Pong! :fire:${ws.ping}ms:fire:`);
	},
};
