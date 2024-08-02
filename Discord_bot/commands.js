const {REST, Routes} = require("discord.js")
require('dotenv').config();

const commands=[
    {
        name:'create',
        description:'Creates a new short URL'
    },
]

const TOKEN = process.env.TOKEN;
const rest = new REST({ version: '10' }).setToken(TOKEN);


// immediately invoked function
(async()=>{
try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands("1268757009369661581"), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }

})();