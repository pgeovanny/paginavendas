/* ===== CONFIG ===== */
const WHATSAPP_NUMBER = "5599999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Tenho dúvidas / Quero contratar agora.");
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
const GAS_ENDPOINT_BASE = "https://script.google.com/macros/s/AKfycby1WaE97d4sux18_dOLT-LTzFb24QGQ5OZ_ojTjeSLnkagRlFIbqro0yrr8Is3A5NYROg/exec";

const CHECKOUT = { /* ... seus links ... */ 
  manual:"https://seu-checkout.com/manual",
  legislacao:"https://seu-checkout.com/legislacao",
  mentoria_material_mensal:"#",
  mentoria_material_trimestral:"#",
  mentoria_sem_material_mensal:"#",
  mentoria_sem_material_trimestral:"#",
};

/* ===== UID ===== */
function getUID(){ let u=localStorage.getItem('pg_uid'); if(!u){u=Math.random().toString(36).slice(2)+Date.now().toString(36); localStorage.setItem('pg_uid',u);} return u; }

/* ===== DATA ===== */
const PRODUCTS = {
  "manual-do-aprovado": {
    slug: "manual-do-aprovado",
    title: "Manual do Aprovado",
    subtitle: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    price: "R$ 97,00",
    sample: "https://drive.google.com/SEU-LINK-AMOSTRA-MANUAL",
    copy: [ /* ...texto... */ ],
    checkout: CHECKOUT.manual
  },
  "legislacao-interna-tjsp-2025": {
    slug: "legislacao-interna-tjsp-2025",
    title: "Legislação Interna TJ-SP 2025",
    subtitle: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas",
    price: "R$ 79,00",
    sample: "https://drive.google.com/SEU-LINK-AMOSTRA-LEGISLACAO",
    copy: [ /* ...texto... */ ],
    checkout: CHECKOUT.legislacao
  },
  "mentoria": {
    slug: "mentoria",
    title: "Mentoria",
    subtitle: "Mentoria personalizada para planejar e acelerar sua aprovação.",
    price: null, sample: null, copy: [ /* ...texto... */ ], checkout: null
  }
};

/* ===== HELPERS ===== */
function qs(n){ return new URLSearchParams(location.search).get(n); }
function fmt(n){ return typeof n==='number'?n:parseInt(n||'0',10); }

/* ===== GAS via POST ===== */
async function apiStats(slug){
  try{
    const res = await fetch(GAS_ENDPOINT_BASE, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action:'stats', slug, uid:getUID() })
    });
    return await res.json();
  }catch(e){ console.warn(e); return {up:0,down:0,my:null}; }
}
async function apiVote(slug, dir, reason){
  try{
    const res = await fetch(GAS_ENDPOINT_BASE, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action:'vote', slug, uid:getUID(), dir, reason: reason||'' })
    });
    return await res.json();
  }catch(e){ console.warn(e); return null; }
}

/* ===== MODAL ===== */
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

/* ===== RENDER ===== */
function renderProduct(){
  const slug=qs('p'); const root=document.getElementById('product-root'); const wa=document.getElementById('whats-float');
  if(!slug || !PRODUCTS[slug]){ root.innerHTML=`<div class="text-center text-blue-50/90">Produto não encontrado. <a class="underline" href="index.html">Voltar</a></div>`; if(wa) wa.style.display='none'; return; }
  if(wa) wa.href = WA_LINK;
  const p=PRODUCTS[slug];

  const head=`
    <div class="glass-panel panel-gradient">
      <h1 class="product-title">${p.title}</h1>
      <p class="product-subtitle">${p.subtitle}</p>
      <div class="status-badge mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 soft-shadow">
        <span class="status-dot status-dot--green"></span>
        <span class="text-sm md:text-[.95rem] text-blue-50/92">Compra garantida • Entrega imediata</span>
      </div>
    </div>`;

  const copyHtml=p.copy.map(t=>`<p>${t}</p>`).join('');
  const priceHtml=p.price?`<div class="product-price">Preço: <span>${p.price}</span></div>`:'';

  let ctasRow='';
  if(p.slug==='mentoria'){
    ctasRow=`<div class="flex flex-col md:flex-row flex-wrap gap-3">
      <a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Contratar agora</a>
      <a class="btn-outline auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
    </div>`;
  }else{
    const sampleBtn=p.sample?`<a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${p.sample}" target="_blank" rel="noopener">Ver amostra</a>`:'';
    const votesBlock=`
      <div class="votes-wrap" data-slug="${p.slug}">
        <button class="vote-btn vote-up" type="button"><span class="vote-icon">👍</span><span class="vote-text">Gostei</span> <span class="vote-count" data-role="up">0</span></button>
        <button class="vote-btn vote-down" type="button"><span class="vote-icon">👎</span><span class="vote-text">Não curti</span> <span class="vote-count" data-role="down">0</span></button>
      </div>`;
    ctasRow=`<div class="flex flex-col md:flex-row flex-wrap gap-3">
      <a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${p.checkout}" target="_blank" rel="noopener">Comprar Agora</a>
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

  // votos
  const vw=document.querySelector('.votes-wrap');
  if(vw){
    const slug=vw.dataset.slug;
    const upBtn=vw.querySelector('.vote-up');
    const downBtn=vw.querySelector('.vote-down');
    const upEl=vw.querySelector('[data-role="up"]');
    const downEl=vw.querySelector('[data-role="down"]');
    let busy=false;

    function setActive(w){ upBtn.classList.toggle('voted', w==='up'); downBtn.classList.toggle('voted', w==='down'); }
    function setDisabled(d){ upBtn.disabled=!!d; downBtn.disabled=!!d; }

    apiStats(slug).then(({up,down,my})=>{ upEl.textContent=fmt(up); downEl.textContent=fmt(down); setActive(my||null); });

    upBtn.addEventListener('click', async e=>{
      e.stopPropagation(); if(busy) return; busy=true; setDisabled(true);
      const res=await apiVote(slug,'up',''); setDisabled(false); busy=false;
      if(res){ upEl.textContent=fmt(res.up); downEl.textContent=fmt(res.down); setActive('up'); }
    });

    downBtn.addEventListener('click', e=>{
      e.stopPropagation(); if(busy) return; ensureModal(); openModal();
      const vm=document.getElementById('vote-modal'); const ta=document.getElementById('vm-reason'); ta.value='';
      const onClick=async ev=>{
        if(ev.target.id==='vm-cancel' || ev.target===vm){ vm.removeEventListener('click',onClick); closeModal(); return; }
        if(ev.target.id==='vm-send'){
          vm.removeEventListener('click',onClick);
          busy=true; setDisabled(true);
          const res=await apiVote(slug,'down', ta.value.trim().slice(0,140));
          setDisabled(false); busy=false; closeModal();
          if(res){ upEl.textContent=fmt(res.up); downEl.textContent=fmt(res.down); setActive('down'); }
        }
      };
      vm.addEventListener('click', onClick);
    });
  }

  // shine automático
  (function loop(){ const ctas=document.querySelectorAll('.btn-primary,.btn-outline'); let i=0; function doOne(){ if(!ctas.length) return; const el=ctas[i%ctas.length]; el.classList.add('shine-now'); setTimeout(()=>el.classList.remove('shine-now'),1100); i++; setTimeout(doOne, 8000+Math.random()*2500);} setTimeout(doOne,2000); })();
}

document.addEventListener('DOMContentLoaded', renderProduct);
