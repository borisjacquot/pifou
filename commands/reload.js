module.exports = {
    name: 'reload',
    description: 'Reload une commande',
    args: true,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`Il n'existe pas de commande \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            message.react('❌');
            return message.channel.send(`Il y a eu une erreur pendant le reload de \`${command.name}\`:\n\`${error.message}\``);
        }
        message.react('✅');
        message.channel.send(`\`${command.name}\` a bien été reload!`);
    },
};