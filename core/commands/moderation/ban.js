const { MessageEmbed } = require("discord.js");

exports.launch = async (client, message, args, lang) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return;
  
  const member = message.mentions.members.first();
  if (!member) return;
  if (!member.bannable) return message.reply(lang.cantban);

  const reason = args.slice(1).join(' ') || lang.noreason;
      
  await message.guild.members.ban(member.id, { reason }).then(() => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`__${member.user.tag}__ ${lang.beenbanned}`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (reason)
      embed.setDescription(`**${lang.reason}:** ${reason}`);

    if (!member.user.bot) user.send(`${lang.bannedMsg} **${message.guild.name}** par **${message.author.tag}** !\n${reason ? `**${lang.reason}:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  });
}