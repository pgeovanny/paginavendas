/* ===== CONFIG ===== */
const WHATSAPP_NUMBER = "5599999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Tenho dúvidas / Quero contratar agora.");
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// Web App do Apps Script
const GAS_ENDPOINT_BASE = "https://script.google.com/macros/s/AKfycbzxuAw8_3WG0Q3P4aymvglYM4Z8FAbm_AUX2ZHAvdtnUxCPI1zK7lqp3PCjp96H4mu80A/exec";

const CHECKOUT = {
  manual: "https://seu-checkout.com/manual",
  legislacao: "https://seu-checkout.com/legislacao",
  mentoria_material_mensal: "#",
  mentoria_material_trimestral: "#",
  mentoria_sem_material_mensal: "#",
  mentoria_sem_material_trimestral: "#"
};

/* ===== UID ===== */
function getUID(){
  let u = localStorage.getItem('pg_uid');
  if(!u){ u = Math.random().toString(36).slice(2)+Date.now().toString(36); localStorage.setItem('pg_uid', u); }
  return u;
}

/* ===== DADOS ===== */
const PRODUCTS = {
  "manual-do-aprovado": {
    slug: "manual-do-aprovado",
    title: "Manual do Aprovado",
    subtitle: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    price: "R$ 97,00",
    sample: "https://drive.google.com/SEU-LINK-AMOSTRA-MANUAL",
    copy: [
      "Você já gastou horas, dias e até anos estudando para concursos, mas sente que não sai do lugar? Que parece estar sempre perdido, sem saber se o que está fazendo realmente funciona? A verdade é que a maioria dos concurseiros começa errado, pulando de método em método, estudando sem organização e perdendo tempo com coisas que não trazem resultado.",
      "O Manual do Aprovado foi criado justamente para mudar essa realidade — por quem já passou por tudo isso e aprendeu na prática o que funciona de verdade para passar em concursos.",
      "Aqui você vai receber um passo a passo claro, prático e testado, que mostra exatamente o que fazer desde o primeiro dia de estudo até a aprovação.",
      "Você vai aprender a organizar seus estudos do jeito certo, com estratégias que aceleram o aprendizado e fazem você fixar o conteúdo com eficiência. Vai saber como revisar para não esquecer, como resolver questões para ganhar experiência e montar ciclos de estudo que otimizam seu tempo.",
      "Esse manual é para quem quer parar de perder tempo fazendo errado e finalmente ir direto ao que gera resultado. É para quem quer estudar com foco, segurança e saber que está no caminho certo.",
      "Ele foi feito por aprovados que passaram anos estudando errado, aprendendo na marra o que funciona e o que não funciona — e agora compartilham esse conhecimento com você, para que você não precise errar tanto quanto eles.",
      "Se você quer sair do lugar, eliminar a dúvida e acelerar sua aprovação, este manual em PDF é seu guia definitivo. Estude menos, estude melhor e conquiste sua vaga mais rápido!"
    ],
    checkout: CHECKOUT.manual
  },
  "legislacao-interna-tjsp-2025": {
    slug: "legislacao-interna-tjsp-2025",
    title: "Legislação Interna TJ-SP 2025",
    subtitle: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas",
    price: "R$ 79,00",
    sample: "https://drive.google.com/SEU-LINK-AMOSTRA-LEGISLACAO",
    copy: [
      "Se preparar para o concurso do Tribunal de Justiça de São Paulo exige muito mais do que decorar a lei seca: é preciso conhecer profundamente a legislação interna, os prazos, as competências, e os detalhes que caem com frequência nas provas.",
      "Pensando nisso, desenvolvemos o material Legislação Interna TJ-SP 2025, em formato PDF, organizado e visualmente acessível que reúne toda a legislação cobrada no edital de forma didática e prática.",
      "Aqui, você não vai perder tempo vasculhando textos longos e difíceis de entender: preparamos tabelas explicativas que destacam exatamente o que você precisa saber — prazos, quóruns, composições e competências — tudo organizado para facilitar seu aprendizado e memorização.",
      "Além disso, incluímos questões inéditas que foram cuidadosamente selecionadas para testar seu conhecimento e garantir que você esteja preparado para os tipos de perguntas que vão aparecer na prova.",
      "Este material é essencial para você que quer acertar o máximo em Legislação. Estude com foco, domine o que realmente cai no edital e aumente suas chances de aprovação."
    ],
    checkout: CHECKOUT.legislacao
  },
  "mentoria": {
    slug: "mentoria",
    title: "Mentoria",
    subtitle: "Mentoria personalizada para planejar e acelerar sua aprovação.",
    price: null,
    sample: null,
    copy: [
      "Conseguir a aprovação em concursos públicos é um desafio que exige muito mais do que vontade: é preciso planejamento estratégico, organização, disciplina e acompanhamento correto — e é exatamente isso que nossa Mentoria oferece.",
      "Na Mentoria, você recebe um plano de estudos totalmente individualizado, elaborado especificamente para o seu perfil, considerando seu tempo disponível, o concurso que você pretende prestar, seu nível atual em cada matéria e o peso das disciplinas no edital.",
      "O plano é acessado por uma plataforma, onde suas metas diárias são divididas em teoria, revisão e resolução de questões.",
      "Mas não para por aí: você terá suporte direto e pessoal comigo, seu mentor, via WhatsApp. Pode tirar dúvidas, pedir orientações e receber feedback sempre que precisar, 7 dias por semana.",
      "Oferecemos a mentoria com duas opções: com material completo do Estratégia Concursos; ou apenas o plano e o acompanhamento.",
      "Fazemos uma reunião inicial para entender suas necessidades e objetivos, garantindo que seu plano seja realmente personalizado.",
      "Se você quer deixar de estudar sem rumo, a Mentoria é sua solução para acelerar sua preparação com foco e estratégia."
    ],
    checkout: null
  }
};

/* ===== Helpers ===== */
function qs(n){ return new URLSearchParams(location.search).get(n); }
function fmt(n){ return typeof n==='number'?n:parseInt(n||'0',10); }

/* ===== GAS via GET (sem CORS chatice) ===== */
async function apiStats(slug){
  try{
    const url = `${GAS_ENDPOINT_BASE}?action=stats&slug=${encodeURIComponent(slug)}&uid=${encodeURIComponent(getUID())}`;
    const r = await fetch(url); if(!r.ok) throw new Error(r.status);
    return await r.json();
  }catch(e){ console.warn(e); return {up:0,down:0,my:null}; }
}
async function apiVote(slug, dir, reason){
  try{
    const url = `${GAS_ENDPOINT_BASE}?action=vote&slug=${encodeURIComponent(slug)}&uid=${encodeURIComponent(getUID())}&dir=${encodeURIComponent(dir)}&reason=${encodeURIComponent(reason||'')}`;
    const r = await fetch(url); if(!r.ok) throw new Error(r.status);
    return await r.json();
  }catch(e){ console.warn(e); return null; }
}

/* ===== Modal ===== */
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

/* ===== Render ===== */
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
  (function loop(){ const ctas=document.querySelectorAll('.btn-primary,.btn-outline'); let i=0; function doOne(){ if(!ctas.length) return; const el=ctas[i%ctas.length]; el.classList.add('shine-now'); setTimeout(()=>el.classList.remove('shine-now'),1100); i++; setTimeout(doOne,8000+Math.random()*2500);} setTimeout(doOne,2000); })();
}

document.addEventListener('DOMContentLoaded', renderProduct);
