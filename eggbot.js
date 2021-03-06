// Resource sites: 
// https://www.smashingmagazine.com/2021/02/building-discord-bot-discordjs/
// https://github.com/discordjs/guide/blob/master/code-samples/command-handling/dynamic-commands/12/index.js

const fs = require('fs');
const Discord = require('discord.js');
const prefix = require('./config.json');

require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require('./Commands/${file}');
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('EggBot is ready');
});

client.on('message', message => {
    if (msg.content === 'Hello') msg.reply('Hi');

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error when attempting that command.');
    }
});

client.login(process.env.EGGBOT_TOKEN)