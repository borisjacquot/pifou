const request = require('request');
module.exports = {
    name: 'edt',
    description: 'Affiche l\'emploi du temps du jour.',
    aliases: ['e'],
    execute(message, args) {
        let date_ob = new Date(),
            date = ("0" + date_ob.getDate()).slice(-2),
            month = ("0" + (date_ob.getMonth() + 1)).slice(-2),
            year = date_ob.getFullYear();

        request('http://club.plil.fr/EdT/SC/pifou.php?date=' + year + '-' + month + '-' + date, function (error, response, body) {
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
                message.channel.send("📅 `Emploi du temps du " + date + '/' + month + '/' + year + " - SCTP1`");
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
                        message.channel.send({embed: h});
                    }
                }

            } else if (message.member.roles.cache.some(role => role.name === 'SCtp2')) {
                // tp2 DUPLICATION DE CODE MAIS JAI LA FLEMME IL EST TARD
                message.react('✅');
                message.channel.send("📅 `Emploi du temps du " + date + '/' + month + '/' + year + " - SCTP2`");
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
