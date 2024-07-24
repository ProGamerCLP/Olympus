const Canvas = require('canvas');
const path = require('path');

async function createWelcomeImage(user) {
  const canvas = Canvas.createCanvas(500, 500);
  const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage(path.join(__dirname, '../../olympus.png'));
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
  ctx.save();
  ctx.beginPath();
  ctx.arc(250, 125, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 200, 75, 100, 100);
  ctx.restore();
  
  ctx.font = '30px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Bienvenid@ ${user.username}`, 150, 450);
  
  return canvas.toBuffer();
}

module.exports = { createWelcomeImage };
