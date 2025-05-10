// Fungsi kirim notifikasi ke Discord
export async function sendDiscordWebhook(userData) {
  const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/...';
  
  const approveUrl = `https://YOUR_GITHUB_USERNAME.github.io/polisi-kotaku/approve.html?uid=${userData.uid}`;
  
  const embed = {
    title: "📝 **Permohonan Registrasi Baru**",
    description: `
      **NRP:** ${userData.nrp}
      **Nama:** ${userData.fullname}
      **Email:** ${userData.email}
    `,
    color: 0x3498db,
    timestamp: new Date().toISOString(),
    fields: [{
      name: "Actions",
      value: `[APPROVE](${approveUrl})`
    }]
  };

  const response = await fetch(DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  });

  if (!response.ok) throw new Error('Gagal mengirim ke Discord!');
}