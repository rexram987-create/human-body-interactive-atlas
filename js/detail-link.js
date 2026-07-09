const originalOpenOrgan = window.openOrgan;

window.openOrgan = function(systemKey, organKey) {
  if (typeof originalOpenOrgan !== 'function') return;
  originalOpenOrgan(systemKey, organKey);

  const modalText = document.getElementById('modalText');
  const isHebrew = document.body.dataset.lang !== 'en';
  const linkText = isHebrew ? 'מידע מורחב על האיבר' : 'Full Anatomy Page';
  const existing = modalText.querySelector('.organ-detail-link');
  if (existing) existing.remove();

  const link = document.createElement('a');
  link.className = 'primary organ-detail-link';
  link.href = `organ.html?organ=${encodeURIComponent(organKey)}`;
  link.textContent = linkText;
  modalText.appendChild(link);
};
