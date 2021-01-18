const request = require('request');
module.exports = {
    name: 'turfu',
    description: 'Affiche l\'emploi du temps de n\'importe quelle date.',
    args: true,
    usage: '<JOUR-MOIS-ANNEE>',
    aliases: ['t'],
    execute(message, args) {
        let date = args[0].split("-")
        request('http://mc.axel-chemin.fr/ADE/pifou2.php?date=' + date[2] + '-' + date[1] + '-' + date[0], function (error, response, body) {
            if (!response || response.statusCode !== 200) {
                message.react('❌');
                message.channel.send(`Erreur`);
                return;
            }
            const obj = JSON.parse(body);
            obj.sort((a, b) => a.slot.localeCompare(b.slot))
            let s, color, teach;
            if(message.member.roles.cache.some(role => role.name === 'SCtp1')) {
                // tp1
                message.react('✅');
                message.channel.send("📅 `Emploi du temps du " + date[0] + '/' + date[1] + '/' + date[2] + " - SCTP1`");
                for (let i = 0; i < obj.length; i++) {
                    if (obj[i].group !== "TP2") {
                        // on converti rgb en hexa
                        s = obj[i].color.split(',');
                        color = Number(s[0]).toString(16) + Number(s[1]).toString(16) + Number(s[2]).toString(16);
                        color = parseInt(color, 16);

                        if (obj[i].teacher === "") {
                            teach = "Inconnu"
                        } else {
                            teach = obj[i].teacher
                        }

                        let h = {
                            "color": color,
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
                                    "value": teach,
                                    "inline": true
                                }
                            ]
                        };
                        console.log(h)
                        message.channel.send({embed: h});
                    }
                }

            } else if (message.member.roles.cache.some(role => role.name === 'SCtp2')) {
                // tp2 DUPLICATION DE CODE MAIS JAI LA FLEMME IL EST TARD
                message.react('✅');
                message.channel.send("📅 `Emploi du temps du " + date[0] + '/' + date[1] + '/' + date[2] + " - SCTP2`");
                for (let i = 0; i < obj.length; i++) {
                    // on converti rgb en hexa
                    s = obj[i].color.split(',');
                    color = Number(s[0]).toString(16) + Number(s[1]).toString(16) + Number(s[2]).toString(16);
                    color = parseInt(color, 16);

                    if (obj[i].teacher === "") {
                        teach = "Inconnu"
                    } else {
                        teach = obj[i].teacher
                    }

                    if (obj[i].group !== "TP1") {
                        let h = {
                            "color": color,
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
                                    "value": teach,
                                    "inline": true
                                }
                            ]
                        };
                        message.channel.send({embed: h});
                    }
                }

            } else {
                // pas le rôle
                message.react('❌');
                message.channel.send(`😔 Tu ne fais pas partie de la meilleure des filières...\n(Tu as peut être oublié de choisir ton rôle dans ` + message.guild.channels.cache.get('788081671144210443').toString() + `)`);
            }
        });
    },
}
