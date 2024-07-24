module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
      console.log(`Ready! Logged in as ${client.user.tag}`);
      
      const ticketChannelId = '1263617354718249099'; // Replace with your ticket channel ID
      const channel = await client.channels.fetch(ticketChannelId);
      
      const ticketEmbed = {
        title: 'Sistema General Tickets Olympus RP',
        description: 'Bienvenido al sistema de tickets de Olympus, pulsa el botón de selecciona una categoría para crear un ticket.\n\nEl mal uso del sistema de tickets podrá ser penalizado',
        color: 0x00ff00,
      };
  
      const row = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId('ticket_category')
            .setPlaceholder('Selecciona una categoría')
            .addOptions([
              { label: 'Soporte General', value: 'soporte_general' },
              { label: 'Reportar Bug', value: 'reportar_bug' },
              { label: 'Tengo una Queja', value: 'tengo_una_queja' },
              { label: 'Proyecto Criminal', value: 'proyecto_criminal' },
              { label: 'Solicitar CK PKT', value: 'solicitar_ck_pkt' },
              { label: 'Apelar Baneo', value: 'apelar_baneo' },
              { label: 'Proyecto Creador de Contenido', value: 'proyecto_cc' },
              { label: 'Realizar una Donación', value: 'realizar_donacion' },
            ])
        );
  
      await channel.send({ embeds: [ticketEmbed], components: [row] });
    },
  };
  