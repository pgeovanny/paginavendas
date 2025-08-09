/* ===== CONFIG ===== */
const WHATSAPP_NUMBER = "5599999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Tenho dúvidas / Quero contratar agora.");
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// Web App do Apps Script
const GAS_ENDPOINT_BASE = "https://script.google.com/macros/s/AKfycbyPf6Cwfh0Q6RGE11u8Pz0uj5jXPDjfDCC7nImy139Smz0OaywfhSFcnlNvwFiqIEzXZA/exec";

/* ===== UID ===== */
function getUID(){
  let u = localStorage.getItem('pg_uid');
  if(!u){ u = Math.random().toString(36).slice(2)+Date.now().toString(36); localStorage.setItem('pg_uid', u); }
  return u;
}

/* ===== MINI CSS (loader + micro animações) ===== */
(function injectStyle(){
  if(document.getElementById('pg-inline-style')) return;
  const css = `
  .pg-loading{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(6,12,32,.45);backdrop-filter:blur(2px);z-index:9999}
  .pg-loading.open{display:flex}
  .pg-spinner{width:42px;height:42px;border-radius:50%;border:3px solid rgba(255,255,255,.25);border-top-color:#7fb2ff;animation:pgspin 0.9s linear infinite}
  @keyframes pgspin{to{transform:rotate(360deg)}}
  .vote-btn.voted{outline:2px solid rgba(127,178,255,.6); box-shadow:0 0 0 3px rgba(127,178,255,.15) inset;}
  .vote-btn:disabled{opacity:.6;cursor:not-allowed}
  .shine-now{position:relative;overflow:hidden}
  .shine-now::after{content:"";position:absolute;inset:0;transform:translateX(-120%);background:linear-gradient(100deg,transparent 0%,rgba(255,255,255,.12) 50%,transparent 100%);animation:sh 1.1s ease}
  @keyframes sh{to{transform:translateX(120%)}}
  `;
  const s=document.createElement('style'); s.id='pg-inline-style'; s.textContent=css; document.head.appendChild(s);
  const overlay=document.createElement('div'); overlay.id='pg-loading'; overlay.className='pg-loading'; overlay.innerHTML='<div class="pg-spinner"></div>'; document.body.appendChild(overlay);
})();
function showLoading(){ const el=document.getElementById('pg-loading'); if(el) el.classList.add('open'); }
function hideLoading(){ const el=document.getElementById('pg-loading'); if(el) el.classList.remove('open'); }

/* ===== HELPERS ===== */
function qs(n){ return new URLSearchParams(location.search).get(n); }
function fmt(n){ return typeof n==='number'?n:parseInt(n||'0',10); }

/* ===== GAS (Catálogo/Votos) ===== */
async function apiProducts(){
  const url = `${GAS_ENDPOINT_BASE}?action=products`;
  const r = await fetch(url); if(!r.ok) throw new Error(r.status);
  return r.json();
}
async function apiProduct(slug){
  const url = `${GAS_ENDPOINT_BASE}?action=product&slug=${encodeURIComponent(slug)}`;
  const r = await fetch(url); if(!r.ok) throw new Error(r.status);
  return r.json();
}
async function apiStats(slug){
  const url = `${GAS_ENDPOINT_BASE}?action=stats&slug=${encodeURIComponent(slug)}&uid=${encodeURIComponent(getUID())}`;
  const r = await fetch(url); if(!r.ok) throw new Error(r.status);
  return r.json();
}
async function apiVote(slug, dir, reason){
  const url = `${GAS_ENDPOINT_BASE}?action=vote&slug=${encodeURIComponent(slug)}&uid=${encodeURIComponent(getUID())}&dir=${encodeURIComponent(dir)}&reason=${encodeURIComponent(reason||'')}`;
  const r = await fetch(url); if(!r.ok) throw new Error(r.status);
  return r.json();
}

/* ===== HOME ===== */
async function renderHome(){
  const list = document.getElementById('home-products');
  if(!list) return;

  showLoading();
  let data=null;
  try{ data = await apiProducts(); }
  catch(e){ console.warn(e); hideLoading(); list.innerHTML = `<div class="text-blue-100/80">Não foi possível carregar os produtos agora.</div>`; return; }
  finally{ hideLoading(); }

  const items = (data.items||[]);
  if(!items.length){ list.innerHTML = `<div class="text-blue-100/80">Sem produtos ativos no momento.</div>`; return; }

  list.innerHTML = items.map(p=>{
    const href = `produto.html?p=${encodeURIComponent(p.slug)}`;
    return `
    <a class="home-card hover:scale-[1.01] transition" href="${href}">
      <div class="home-card-title">${p.title}</div>
      <div class="home-card-sub">${p.subtitle}</div>
    </a>`;
  }).join('');
}

/* ===== MODAL (motivo do downvote) ===== */
function ensureModal(){
  if(document.getElementById('vote-modal')) return;
  const div=document.createElement('div');
  div.id='vote-modal';
  div.innerHTML=`
  <style>
    #vote-modal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.5);z-index:9999}
    #vote-modal.open{display:flex}
    .vm-card{width:min(92vw,520px);background:rgba(10,20,50,.95);border:1px solid rgba(173,197,255,.2);border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,.6);padding:16px}
    .vm-title{font-weight:800;margin-bottom:8px}
    .vm-text{font-size:.95rem;opacity:.9;margin-bottom:10px}
    .vm-ta{width:100%;min-height:90px;border:1px solid rgba(173,197,255,.25);background:rgba(255,255,255,.05);border-radius:10px;color:#fff;padding:10px;resize:vertical}
    .vm-actions{display:flex;gap:8px;margin-top:12px;justify-content:flex-end}
    .vm-btn{padding:.7rem 1rem;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);font-weight:800;color:#fff;cursor:pointer}
    .vm-btn:hover{background:rgba(255,255,255,.12)}
    .vm-primary{background:#204489;border-color:rgba(255,255,255,.12)}
    .vm-primary:hover{background:#18356f}
  </style>
  <div class="vm-card">
    <div class="vm-title">Não curti — conte rapidamente o motivo</div>
    <div class="vm-text">Sua resposta ajuda a melhorar o material. (opcional, máx. 140)</div>
    <textarea id="vm-reason" class="vm-ta" maxlength="140" placeholder="Ex.: Preço alto / Layout confuso"></textarea>
    <div class="vm-actions">
      <button id="vm-cancel" class="vm-btn">Cancelar</button>
      <button id="vm-send" class="vm-btn vm-primary">Enviar</button>
    </div>
  </div>`;
  document.body.appendChild(div);
}
function openModal(){ ensureModal(); document.getElementById('vote-modal').classList.add('open'); }
function closeModal(){ const el=document.getElementById('vote-modal'); if(el) el.classList.remove('open'); }
function askReason(){
  return new Promise(resolve=>{
    ensureModal(); openModal();
    const vm=document.getElementById('vote-modal'); const ta=document.getElementById('vm-reason'); ta.value='';
    const onClick=(ev)=>{
      if(ev.target.id==='vm-cancel' || ev.target===vm){ vm.removeEventListener('click',onClick); closeModal(); resolve(''); }
      if(ev.target.id==='vm-send'){ vm.removeEventListener('click',onClick); const r=ta.value.trim().slice(0,140); closeModal(); resolve(r); }
    };
    vm.addEventListener('click', onClick);
  });
}

/* ===== PRODUTO ===== */
async function renderProduct(){
  const root=document.getElementById('product-root');
  if(!root) return;
  const wa=document.getElementById('whats-float');
  const slug=qs('p');
  if(!slug){ root.innerHTML=`<div class="text-blue-50/90">Produto não encontrado. <a class="underline" href="index.html">Voltar</a></div>`; if(wa) wa.style.display='none'; return; }
  if(wa) wa.href = WA_LINK;

  showLoading();
  let p=null;
  try{ p = await apiProduct(slug); }
  catch(e){ console.warn(e); hideLoading(); root.innerHTML=`<div class="text-blue-50/90">Não foi possível carregar o produto agora.</div>`; return; }

  if(p && p.error){ hideLoading(); root.innerHTML=`<div class="text-blue-50/90">Produto não encontrado. <a class="underline" href="index.html">Voltar</a></div>`; return; }

  const head=`
  <div class="glass-panel panel-gradient">
    <h1 class="product-title">${p.title}</h1>
    <p class="product-subtitle">${p.subtitle}</p>
    <div class="status-badge mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 soft-shadow">
      <span class="status-dot status-dot--green"></span>
      <span class="text-sm md:text-[.95rem] text-blue-50/92">Compra garantida • Entrega imediata</span>
    </div>
  </div>`;

  const copyHtml=(p.copy||[]).map(t=>`<p>${t}</p>`).join('');
  const priceHtml=p.price?`<div class="product-price">Preço: <span>${p.price}</span></div>`:'';

  const sampleBtn = p.sample
    ? `<a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${p.sample}" target="_blank" rel="noopener">Ver amostra</a>`
    : "";

  // bloco de votos (para todos os tipos, inclusive mentoria)
  const votesBlock=`
    <div class="votes-wrap" data-slug="${p.slug}">
      <button class="vote-btn vote-up" type="button"><span class="vote-icon">👍</span><span class="vote-text">Gostei</span> <span class="vote-count" data-role="up">${fmt(p.votes?.up||0)}</span></button>
      <button class="vote-btn vote-down" type="button"><span class="vote-icon">👎</span><span class="vote-text">Não curti</span> <span class="vote-count" data-role="down">${fmt(p.votes?.down||0)}</span></button>
    </div>`;

  // CTAs dependendo do tipo
  let ctasRow='';
  if((p.type||'produto')==='mentoria'){
    ctasRow=`<div class="flex flex-col md:flex-row flex-wrap gap-3">
      <a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Contratar agora</a>
      <a class="btn-outline auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
    </div>${votesBlock}`;
  }else{
    ctasRow=`<div class="flex flex-col md:flex-row flex-wrap gap-3">
      <a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${p.checkout||'#'}" target="_blank" rel="noopener">Comprar Agora</a>
      ${sampleBtn}
      <a class="btn-outline auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
    </div>${votesBlock}`;
  }

  root.innerHTML=`${head}
    <div class="mt-8 space-y-6 glass-section section-gradient product-copy">
      ${copyHtml}
      ${priceHtml}
      <div class="mt-4">${ctasRow}<div class="mt-3"><a class="btn-ghost" href="index.html">Voltar</a></div></div>
    </div>`;

  hideLoading();

  // ===== Votos (UI otimista + loading curto) =====
  const vw=document.querySelector('.votes-wrap');
  if(vw){
    const slug=vw.dataset.slug;
    const upBtn=vw.querySelector('.vote-up');
    const downBtn=vw.querySelector('.vote-down');
    const upEl=vw.querySelector('[data-role="up"]');
    const downEl=vw.querySelector('[data-role="down"]');
    let busy=false;

    // estado inicial (confirma my)
    apiStats(slug).then(({my})=>{
      upBtn.classList.toggle('voted', my==='up');
      downBtn.classList.toggle('voted', my==='down');
    }).catch(()=>{});

    function setActive(w){ upBtn.classList.toggle('voted', w==='up'); downBtn.classList.toggle('voted', w==='down'); }
    function setDisabled(d){ upBtn.disabled=!!d; downBtn.disabled=!!d; }

    async function handleVote(dir){
      if(busy) return; busy=true; setDisabled(true);
      // otimista
      const prev = { up: fmt(upEl.textContent), down: fmt(downEl.textContent), my: (upBtn.classList.contains('voted')?'up': (downBtn.classList.contains('voted')?'down':null)) };
      if(dir==='up'){
        if(prev.my==='down'){ downEl.textContent = Math.max(0, prev.down-1); }
        if(prev.my!=='up'){ upEl.textContent = prev.up+1; }
        setActive('up');
      }else{
        if(prev.my==='up'){ upEl.textContent = Math.max(0, prev.up-1); }
        if(prev.my!=='down'){ downEl.textContent = prev.down+1; }
        setActive('down');
      }

      // motivo (se down)
      let reason='';
      if(dir==='down'){ reason = await askReason(); }

      // request
      showLoading();
      let res=null;
      try{ res = await apiVote(slug, dir, reason); }
      catch(_){ /* falha */ }
      hideLoading();

      if(!res){
        // rollback
        upEl.textContent = prev.up; downEl.textContent = prev.down; setActive(prev.my);
      }else{
        upEl.textContent = fmt(res.up); downEl.textContent = fmt(res.down); setActive(dir);
      }
      setDisabled(false); busy=false;
    }

    upBtn.addEventListener('click', ()=>handleVote('up'));
    downBtn.addEventListener('click', ()=>handleVote('down'));
  }

  // shine automático nos CTAs
  (function loop(){ const ctas=document.querySelectorAll('.btn-primary,.btn-outline'); let i=0; function doOne(){ if(!ctas.length) return; const el=ctas[i%ctas.length]; el.classList.add('shine-now'); setTimeout(()=>el.classList.remove('shine-now'),1100); i++; setTimeout(doOne,8000+Math.random()*2500);} setTimeout(doOne,2000); })();
}

/* ===== BOOT ===== */
document.addEventListener('DOMContentLoaded', ()=>{
  renderHome();
  renderProduct();
});
