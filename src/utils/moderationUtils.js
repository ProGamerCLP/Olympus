const { EmbedBuilder } = require('discord.js');

async function logModerationAction(interaction, logChannelId, description, image) {
  const embed = new EmbedBuilder()
    .setTitle('Moderation Action')
    .setDescription(description)
    .setColor(0xff0000)
    .setTimestamp();
  
  if (image) {
    embed.setImage(image.url);
  }
  
  const logChannel = await interaction.guild.channels.fetch(logChannelId);
  await logChannel.send({ embeds: [embed] });
}

module.exports = { logModerationAction };
