const fs = require('fs');
const Discord = require("discord.js");
const config = require("./config.json");
require('dotenv').config();

const client = new Discord.Client();

client.once('ready', () => {
    console.log('My body is ready!');

    client.user.setPresence({
        status: "online",
        activity: {
            name: config.PREFIX + "help",
            type: "LISTENING"
        }
    });
});

// chargement des cmd
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // ajoute chaque fichier à la collection
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(config.PREFIX) || message.author.bot) return;
    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    //gestion des alias
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    //erreur args
    if (command.args && !args.length) {
        let reply = `Vous n'avez fourni aucun argument, ${message.author}!`;

        if (command.usage) {
            reply += `\nUtilisation de la commande : \`${config.PREFIX}${command.name} ${command.usage}\``;
        }
        message.react('❌');
        return message.channel.send(reply);
    }

    // execution de la commande
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Une erreur est survenue en lançant la commande!');
    }

});

client.login(process.env.TOKEN); // secret token