// i18n toggle (visuel uniquement)
document.querySelectorAll('.lang-switch .chip').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.lang-switch .chip').forEach(b=>b.classList.remove('chip--on'));
    btn.classList.add('chip--on');
    // (plus tard) charger les libellés depuis un dictionnaire
  });
});

// Dropdown À propos (click + clavier)
const ddBtn = document.querySelector('.nav-dropdown .has-caret');
const panel = document.getElementById('menu-apropos');

function closeMenu(){ panel.style.display='none'; ddBtn.setAttribute('aria-expanded','false'); }
function openMenu(){ panel.style.display='block'; ddBtn.setAttribute('aria-expanded','true'); }

ddBtn?.addEventListener('click', (e)=>{
  e.stopPropagation();
  const open = ddBtn.getAttribute('aria-expanded') === 'true';
  open ? closeMenu() : openMenu();
});
document.addEventListener('click', (e)=>{
  if(!panel.contains(e.target) && e.target!==ddBtn) closeMenu();
});
ddBtn?.addEventListener('keydown', (e)=>{
  if(e.key==='Escape') closeMenu();
});

// Placeholders API (n8n)
const N8N_BASE = (window.N8N_BASE_URL || '') || '{{N8N_BASE_URL}}';
document.getElementById('btn-prices')?.addEventListener('click', async ()=>{
  // Endpoint mock/fallback uniquement pour le MVP visuel
  const payload = { depart:'paris', arrivee:'bordeaux', date:'2025-08-10', heure:'09:24' };
  try{
    const ctrl = new AbortController();
    setTimeout(()=>ctrl.abort(), 4500);
    const r = await fetch(`${N8N_BASE}/pricing/estimate`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload),
      signal: ctrl.signal
    });
    const data = await r.json();
    alert(`Prix estimé : ${data.prix_estime ?? '—'} GNF`);
  }catch(e){
    alert('Service indisponible pour le moment. Réessaie plus tard.');
  }
});
