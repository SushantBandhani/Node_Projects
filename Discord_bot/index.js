import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages] });


client.on('messageCreate', (message) => {
    console.log(`Logged in as ${message.content}!`);
  });