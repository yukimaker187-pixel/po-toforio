class ImageSlot extends HTMLElement {
  connectedCallback() {
    const shape = this.getAttribute('shape') || 'rect';
    const radius = this.getAttribute('radius') || '0';
    const placeholder = this.getAttribute('placeholder') || '';
    const src = this.getAttribute('src');

    const borderRadius = shape === 'rounded' ? `${radius}px` : (shape === 'circle' ? '50%' : '0');

    if (src) {
      this.innerHTML = `<img src="${src}" alt="${placeholder}" style="width:100%;height:100%;object-fit:cover;border-radius:${borderRadius};display:block">`;
      return;
    }

    this.style.borderRadius = borderRadius;
    this.style.overflow = 'hidden';
    this.style.position = 'relative';
    this.style.background = 'linear-gradient(135deg,#111a2d 0%,#1a2540 50%,#0d1424 100%)';
    this.innerHTML = `
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(199,166,112,0.4)" stroke-width="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="m21 15-5-5L5 21"/>
        </svg>
        <span style="font-family:'Noto Sans JP',sans-serif;font-size:10px;letter-spacing:.1em;color:rgba(199,166,112,0.5);text-align:center;line-height:1.6">${placeholder}</span>
      </div>
    `;
  }
}
customElements.define('image-slot', ImageSlot);
