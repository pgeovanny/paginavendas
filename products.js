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

/* ===== DADOS ESTÁTICOS (sem imagens) ===== */
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
  if (wa) wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

  const p = PRODUCTS[slug];

  const head = `
    <div class="glass-panel panel-gradient">
      <h1 class="product-title">${p.title}</h1>
      <p class="product-subtitle">${p.subtitle}</p>
      <div class="status-badge mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 soft-shadow">
        <span class="status-dot status-dot--green" aria-hidden="true"></span>
        <span class="text-sm md:text-[.95rem] text-blue-50/92">Compra garantida • Entrega imediata</span>
      </div>
    </div>
  `;

  const copyHtml = p.copy.map(par => `<p>${par}</p>`).join("");
  const priceHtml = p.price ? `<div class="product-price">Preço: <span>${p.price}</span></div>` : "";

  let ctasRow = "";
  if (p.slug === "mentoria") {
    ctasRow = `
      <div class="flex flex-col md:flex-row flex-wrap gap-3">
        <a class="btn-primary glow-btn auto-shine w-full md:w-auto" href="https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}" target="_blank" rel="noopener">Contratar agora</a>
        <a class="btn-outline auto-shine w-full md:w-auto" href="https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
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
        <a class="btn-outline auto-shine w-full md:w-auto" href="https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
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

  // Shine loop
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
