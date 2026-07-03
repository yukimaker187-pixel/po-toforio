document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('.contact-submit');
  const status = document.getElementById('contact-status');
  const data = Object.fromEntries(new FormData(form).entries());

  button.disabled = true;
  status.style.color = '#aeb6c2';
  status.textContent = '送信中です…';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    if (!res.ok) throw new Error(result.error || '送信に失敗しました。');

    status.style.color = '#c7a670';
    status.textContent = 'お問い合わせを受け付けました。ご連絡ありがとうございます。';
    form.reset();
  } catch (err) {
    status.style.color = '#e07a5f';
    status.textContent = err.message || '送信に失敗しました。時間をおいて再度お試しください。';
  } finally {
    button.disabled = false;
  }
});
