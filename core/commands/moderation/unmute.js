const { MessageEmbed } = require("discord.js");
const util = require('util');

exports.launch = (client, message, args, lang) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return;

  const member = message.mentions.members.first();
  if(!member) return;

  const reason = args.slice(1).join(' ') || lang.noreason;

  const muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
  if(!muteRole) return;
  const hasRole = member.roles.cache.has(muteRole.id);
  if(!hasRole) return message.channel.send(lang.notmuted);

  member.roles.remove(muteRole.id).then(() => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(util.format(lang.beenunmuted, member.user.tag), member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setDescription(`**${lang.reason}:** ${reason}`)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if(!member.bot) member.send(`${util.format(lang.unmutedmsg, message.guild.name, message.author.tag)}\n${reason ? `**${lang.reason}:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  })
}