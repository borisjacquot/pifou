module.exports = {
    name: 'edt',
    description: 'Affiche l\'emploi du temps.',
    aliases: ['e'],
    execute(message, args) {

        // faire requête api

        if(message.member.roles.cache.some(role => role.name === 'SCtp1')) {
            // tp1
            message.react('✅');
            message.channel.send(`🩲 - EDT SC TP1`);

        } else if (message.member.roles.cache.some(role => role.name === 'SCtp2')) {
            // tp2
            message.react('✅');
            message.channel.send(`🩲 - EDT SC TP2`);

        } else {
            // pas le rôle
            message.react('❌');
            message.channel.send(`😔 Tu ne fais pas partie de la meilleure des filières...`);
        }
    },
}
