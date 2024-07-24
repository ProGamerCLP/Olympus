const { SlashCommandBuilder } = require('discord.js');
const { logModerationAction } = require('../utils/moderationUtils');
const { logChannels } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('moderation')
    .setDescription('Moderation commands')
    .addSubcommand(subcommand => 
      subcommand
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(true))
        .addAttachmentOption(option => option.setName('image').setDescription('Evidence for the ban')))
    .addSubcommand(subcommand => 
      subcommand
        .setName('time')
        .setDescription('Time ban a user')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('The duration of the ban').setRequired(true))),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const image = interaction.options.getAttachment('image');
    const duration = interaction.options.getString('duration');
    
    let logChannelId;
    let description;
    
    switch(subcommand) {
      case 'ban':
        logChannelId = logChannels.ban;
        description = `User ${user.tag} has been banned.\nReason: ${reason}\nModerator: ${interaction.user.tag}`;
        break;
      case 'time':
        logChannelId = logChannels.time;
        description = `User ${user.tag} has been time banned.\nReason: ${reason}\nDuration: ${duration}\nModerator: ${interaction.user.tag}`;
        break;
      default:
        return;
    }
    
    await logModerationAction(interaction, logChannelId, description, image);
    await interaction.reply(`Action executed: ${subcommand}`);
  }
};
