/* ===== CONFIGURAÇÕES GERAIS ===== */
const WHATSAPP_NUMBER = "5599999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Tenho dúvidas / Quero contratar agora.");
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const CHECKOUT = {
  manual: "https://seu-checkout.com/manual",
  legislacao: "https://seu-checkout.com/legislacao",
  mentoria_material_mensal: "https://seu-checkout.com/mentoria-material-mensal",
  mentoria_material_trimestral: "https://seu-checkout.com/mentoria-material-trimestral",
  mentoria_sem_material_mensal: "https://seu-checkout.com/mentoria-sem-material-mensal",
  mentoria_sem_material_trimestral: "https://seu-checkout.com/mentoria-sem-material-trimestral"
};

/* ===== IMAGENS INTERNAS (SVG em data URI, alta qualidade) ===== */
function svgURI(svg) { return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`; }

const IMG_MANUAL = svgURI(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 840">
  <defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1b3a"/>
      <stop offset="1" stop-color="#1d3874"/>
    </linearGradient>
    <radialGradient id="glow1" cx="70%" cy="20%" r="60%">
      <stop offset="0" stop-color="#93b6ff" stop-opacity=".35"/>
      <stop offset="1" stop-color="#93b6ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a3c1ff"/>
      <stop offset="1" stop-color="#eaf0ff"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="840" fill="url(#bg1)"/>
  <ellipse cx="980" cy="160" rx="520" ry="260" fill="url(#glow1)"/>
  <g opacity=".5" stroke="#5d86ff" stroke-width="2">
    <path d="M220 640h860m-820 40h780m-740 40h700" opacity=".5"/>
  </g>
  <g transform="translate(200,200)">
    <rect x="0" y="0" width="540" height="360" rx="22" fill="rgba(255,255,255,.06)" stroke="rgba(173,197,255,.25)"/>
    <g transform="translate(34,36)" fill="#eaf0ff">
      <rect x="0" y="0" width="420" height="20" rx="6" opacity=".9"/>
      <rect x="0" y="44" width="380" height="18" rx="6" opacity=".8"/>
      <rect x="0" y="86" width="420" height="18" rx="6" opacity=".75"/>
      <rect x="0" y="128" width="360" height="18" rx="6" opacity=".7"/>
    </g>
    <rect x="34" y="190" width="470" height="120" rx="14" fill="rgba(255,255,255,.06)" stroke="rgba(173,197,255,.25)"/>
  </g>
  <text x="760" y="380" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-weight="800" font-size="70" fill="url(#accent1)">Manual do Aprovado</text>
  <text x="760" y="440" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-size="30" fill="#dfe8ff">O passo a passo definitivo</text>
  <text x="760" y="476" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-size="30" fill="#dfe8ff">para estudar do jeito certo e passar mais rápido</text>
  <rect x="760" y="520" width="340" height="56" rx="14" fill="#204489"/>
  <text x="930" y="558" text-anchor="middle" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-weight="800" font-size="28" fill="#ffffff">PDF Premium</text>
</svg>
`);

const IMG_LEGIS = svgURI(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 840">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1b3a"/>
      <stop offset="1" stop-color="#18356f"/>
    </linearGradient>
    <radialGradient id="glow2" cx="30%" cy="15%" r="70%">
      <stop offset="0" stop-color="#9ab5ff" stop-opacity=".3"/>
      <stop offset="1" stop-color="#9ab5ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a3c1ff"/>
      <stop offset="1" stop-color="#eaf0ff"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="840" fill="url(#bg2)"/>
  <circle cx="380" cy="160" r="260" fill="url(#glow2)"/>
  <!-- tabela/quadros -->
  <g transform="translate(180,240)" fill="none" stroke="rgba(173,197,255,.35)">
    <rect x="0" y="0" width="500" height="300" rx="18" fill="rgba(255,255,255,.05)"/>
    <path d="M0 70h500M0 140h500M0 210h500"/>
    <path d="M125 0v300M250 0v300M375 0v300"/>
  </g>
  <text x="720" y="370" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-weight="800" font-size="64" fill="url(#accent2)">Legislação Interna TJ-SP 2025</text>
  <text x="720" y="428" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-size="30" fill="#dfe8ff">Conteúdo direto, tabelado e com questões inéditas</text>
  <rect x="720" y="500" width="360" height="56" rx="14" fill="#204489"/>
  <text x="900" y="538" text-anchor="middle" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-weight="800" font-size="28" fill="#ffffff">Material Organizado</text>
</svg>
`);

const IMG_MENTORIA = svgURI(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 840">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1b3a"/>
      <stop offset="1" stop-color="#1a2f63"/>
    </linearGradient>
    <radialGradient id="glow3" cx="70%" cy="30%" r="60%">
      <stop offset="0" stop-color="#b7c9ff" stop-opacity=".3"/>
      <stop offset="1" stop-color="#b7c9ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a3c1ff"/>
      <stop offset="1" stop-color="#eaf0ff"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="840" fill="url(#bg3)"/>
  <ellipse cx="980" cy="220" rx="520" ry="260" fill="url(#glow3)"/>
  <!-- gráfico/plano -->
  <g transform="translate(200,260)" fill="none" stroke="#83a6ff">
    <rect x="0" y="0" width="520" height="320" rx="20" fill="rgba(255,255,255,.05)" stroke="rgba(173,197,255,.35)"/>
    <polyline points="40,250 140,220 220,240 310,180 420,200 480,140" stroke-width="4"/>
    <circle cx="140" cy="220" r="6" fill="#83a6ff" stroke="white"/>
    <circle cx="310" cy="180" r="6" fill="#83a6ff" stroke="white"/>
    <circle cx="480" cy="140" r="6" fill="#83a6ff" stroke="white"/>
  </g>
  <text x="760" y="380" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-weight="800" font-size="72" fill="url(#accent3)">Mentoria</text>
  <text x="760" y="438" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-size="30" fill="#dfe8ff">Plano personalizado e acompanhamento direto</text>
  <rect x="760" y="500" width="320" height="56" rx="14" fill="#204489"/>
  <text x="920" y="538" text-anchor="middle" font-family="Plus Jakarta Sans,Segoe UI,Roboto" font-weight="800" font-size="28" fill="#ffffff">Acompanhamento 1:1</text>
</svg>
`);

const IMAGES = {
  manual: IMG_MANUAL,
  legislacao: IMG_LEGIS,
  mentoria: IMG_MENTORIA
};

/* ===== DADOS ESTÁTICOS DOS PRODUTOS ===== */
const PRODUCTS = {
  "manual-do-aprovado": {
    slug: "manual-do-aprovado",
    title: "Manual do Aprovado",
    subtitle: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    price: "R$ 97,00",
    // imagem interna:
    img: IMAGES.manual,
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
    img: IMAGES.legislacao,
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
    img: IMAGES.mentoria,
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

/* ===== HELPERS ===== */
function qs(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/* ===== RENDER ===== */
function renderProduct() {
  const slug = qs("p");
  const root = document.getElementById("product-root");
  const wa = document.getElementById("whats-float");
  if (!slug || !PRODUCTS[slug]) {
    root.innerHTML = `<div class="text-center text-blue-50/90 text-[1.05rem]">
      Produto não encontrado. <a class="underline hover:text-white" href="index.html">Voltar</a>
    </div>`;
    if (wa) wa.style.display = "none";
    return;
  }

  if (wa) wa.href = WA_LINK;

  const p = PRODUCTS[slug];

  const head = `
    <div class="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
      <div class="glass-card neon-outline rounded-2xl overflow-hidden card-gradient card-tilt">
        <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover" loading="lazy">
      </div>
      <div class="glass-panel panel-gradient">
        <h1 class="product-title">${p.title}</h1>
        <p class="product-subtitle">${p.subtitle}</p>
        <div class="status-badge mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 soft-shadow">
          <span class="status-dot status-dot--green" aria-hidden="true"></span>
          <span class="text-sm md:text-[.95rem] text-blue-50/92">Compra garantida • Entrega imediata</span>
        </div>
      </div>
    </div>
  `;

  const copyHtml = p.copy.map(par => `<p>${par}</p>`).join("");
  const priceHtml = p.price ? `<div class="product-price">Preço: <span>${p.price}</span></div>` : "";

  let ctasRow = "";
  if (p.slug === "mentoria") {
    ctasRow = `
      <div class="flex flex-col md:flex-row flex-wrap gap-3">
        <a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Contratar agora</a>
        <a class="btn-outline auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
      </div>
    `;
  } else {
    const sampleBtn = p.sample
      ? `<a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${p.sample}" target="_blank" rel="noopener">Ver amostra</a>`
      : "";
    ctasRow = `
      <div class="flex flex-col md:flex-row flex-wrap gap-3">
        <a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="${p.checkout}" target="_blank" rel="noopener">Comprar Agora</a>
        ${sampleBtn}
        <a class="btn-outline auto-shine w-full md:w-auto" href="${WA_LINK}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
      </div>
    `;
  }

  const backRow = `<div class="mt-3"><a class="btn-ghost" href="index.html">Voltar</a></div>`;

  root.innerHTML = `
    ${head}
    <div class="mt-8 space-y-6 glass-section section-gradient product-copy">
      ${copyHtml}
      ${priceHtml}
      <div class="mt-4">
        ${ctasRow}
        ${backRow}
      </div>
    </div>
  `;

  const tilt = document.querySelector('.card-tilt');
  if (tilt) {
    tilt.addEventListener('mousemove', (e) => {
      const r = tilt.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -6;
      const ry = ((x / r.width) - 0.5) * 6;
      tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    tilt.addEventListener('mouseleave', () => {
      tilt.style.transform = 'rotateX(0) rotateY(0)';
    });
  }

  // shine nos CTAs
  (function autoShineLoop(){
    const ctas = document.querySelectorAll('.btn-primary, .btn-outline');
    let idx = 0;
    function shineNext(){
      if(!ctas.length) return;
      const el = ctas[idx % ctas.length];
      el.classList.add('shine-now');
      setTimeout(()=> el.classList.remove('shine-now'), 1100);
      idx++;
      const wait = 8000 + Math.floor(Math.random()*2500);
      setTimeout(shineNext, wait);
    }
    setTimeout(shineNext, 2000);
  })();
}

document.addEventListener("DOMContentLoaded", renderProduct);
