const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createWelcomeImage } = require('../utils/welcomeUtils');
const { welcomeChannelId } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Sends a welcome message to a user.')
    .addUserOption(option => option.setName('user').setDescription('The user to welcome').setRequired(true)),
  
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const welcomeImage = await createWelcomeImage(user);
    const embed = new EmbedBuilder()
      .setTitle('Bienvenid@')
      .setDescription(`Bienvenid@ ${user.username}`)
      .setImage('attachment://welcome.png');

    await interaction.reply({
      content: `<@${user.id}>`,
      embeds: [embed],
      files: [welcomeImage],
    });

    const welcomeChannel = await interaction.guild.channels.fetch(welcomeChannelId);
    await welcomeChannel.send({
      content: `ID: ${user.id}\nFecha de unión: ${user.createdAt}\nNúmero de usuario: ${interaction.guild.memberCount}`,
    });
  },
};
