module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['pifou'],
    execute(message, args) {
        message.channel.send('🏓 Glop glop.');
        message.react('✅');
    },
};