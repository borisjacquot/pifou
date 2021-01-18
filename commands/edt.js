const request = require('request');
module.exports = {
    name: 'edt',
    description: 'Affiche l\'emploi du temps.',
    aliases: ['e'],
    execute(message, args) {

        request('http://mc.axel-chemin.fr/ADE/pifou.php?date=are', function (error, response, body) {
            const obj = JSON.parse(body);

            if(message.member.roles.cache.some(role => role.name === 'SCtp1')) {
                // tp1
                message.react('✅');
                message.channel.send("📅 `Emploi du temps du 18/01/2021 - SCTP1`");
                for (let i = 0; i < obj.length; i++) {
                    let h = {
                        "color": 0x27ae60,
                        "fields": [
                            {
                                "name": "⏰ Heure",
                                "value": obj[i].slot,
                                "inline": true
                            },
                            {
                                "name": "📚 Matière",
                                "value": obj[i].subject,
                                "inline": true
                            },
                            {
                                "name": "🎓 Encadrant",
                                "value": obj[i].teacher,
                                "inline": true
                            }
                        ]
                    };
                    message.channel.send({embed: h});
                }

            } else if (message.member.roles.cache.some(role => role.name === 'SCtp2')) {
                // tp2
                message.react('✅');
                message.channel.send(`WIP`);

            } else {
                // pas le rôle
                message.react('❌');
                message.channel.send(`😔 Tu ne fais pas partie de la meilleure des filières...`);
            }
        });
    },
}
