module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		const { ws } = message.client;
		message.channel.send(`Pong! :fire: ${ws.ping}ms :fire:`);
	},
};
