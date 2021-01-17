const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Liste des commande ou informations d\'une commande particulière',
    aliases: ['commands'],
    usage: '[command name]',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Voici la liste de mes commandes: ');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nUtiliser \`${config.PREFIX}help [commande]\` pour avoir les informations d'une commande spécifique!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Je t\'ai envoyé la liste de mes commandes par DM!');
                })
                .catch(error => {
                    console.error(`Je n'ai pas pu envoyer de DM à ${message.author.tag}.\n`, error);
                    message.reply('Il semblerait que je ne puisse pas t\'envoyer de DM!');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Ce n\'est pas une commande valide !');
        }

        data.push(`**Nom:** ${command.name}`);

        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Utilisation:** ${config.PREFIX}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });
        message.react('✅');

    },
};