const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(process.env.hypixel_token, {rateLimit: 'AUTO'});
module.exports = hypixel;