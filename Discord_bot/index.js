require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
    // console.log(message)
    // console.log(message.content);
    if(message.author.bot)return;
    message.reply({
        content:"hi from bot"
    })
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);
