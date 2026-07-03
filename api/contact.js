const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'KOUYA BIG DIPPER DESIGN <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { name, company, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({ error: 'お名前・メールアドレス・お問い合わせ内容は必須です。' });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'メールアドレスの形式が正しくありません。' });
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
      subject: `【サイトお問い合わせ】${name}様より`,
      text: [
        `お名前: ${name}`,
        `御社名: ${company || '(未入力)'}`,
        `メールアドレス: ${email}`,
        `電話番号: ${phone || '(未入力)'}`,
        '',
        'お問い合わせ内容:',
        message
      ].join('\n')
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend send failed:', err);
    res.status(500).json({ error: '送信に失敗しました。時間をおいて再度お試しください。' });
  }
};
