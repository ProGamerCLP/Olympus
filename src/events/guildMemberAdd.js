const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Canvas = require('canvas');
const { welcomeChannelId } = require('../config.json');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/olympus.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#74037b';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = '40px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText('Bienvenid@', canvas.width / 2.5, canvas.height / 3.5);

    context.font = applyText(canvas, `${member.displayName}!`);
    context.fillStyle = '#ffffff';
    context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome-image.png' });

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle('Bienvenid@')
      .setDescription(`Bienvenid@ ${member} al servidor!`)
      .setImage('attachment://welcome-image.png');

    const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId);
    welcomeChannel.send({ embeds: [embed], files: [attachment] });
  },
};

function applyText(canvas, text) {
  const context = canvas.getContext('2d');
  let fontSize = 70;

  do {
    context.font = `${fontSize -= 10}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);

  return context.font;
}
