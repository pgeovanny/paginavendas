/* ===== CONFIGURAÇÕES GERAIS ===== */
const WHATSAPP_NUMBER = "5599999999999"; // DDI+DDD+número
const WHATSAPP_MSG = encodeURIComponent("Olá! Tenho dúvidas sobre o produto.");
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// Links de checkout (troque pelos reais)
const CHECKOUT = {
  manual: "https://seu-checkout.com/manual",
  legislacao: "https://seu-checkout.com/legislacao",
  mentoria_material_mensal: "https://seu-checkout.com/mentoria-material-mensal",
  mentoria_material_trimestral: "https://seu-checkout.com/mentoria-material-trimestral",
  mentoria_sem_material_mensal: "https://seu-checkout.com/mentoria-sem-material-mensal",
  mentoria_sem_material_trimestral: "https://seu-checkout.com/mentoria-sem-material-trimestral"
};

// Links de amostra (Google Drive ou similar) – ajuste depois
const SAMPLES = {
  manual: "https://drive.google.com/SEU-LINK-AMOSTRA-MANUAL",
  legislacao: "https://drive.google.com/SEU-LINK-AMOSTRA-LEGISLACAO"
};

/* ===== DADOS ESTÁTICOS DOS PRODUTOS ===== */
const PRODUCTS = {
  "manual-do-aprovado": {
    slug: "manual-do-aprovado",
    title: "Manual do Aprovado",
    subtitle: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    price: "R$ 97,00",
    img: "assets/manual.jpg",
    sample: SAMPLES.manual, // novo
    copy: [
      "Você já gastou horas, dias e até anos estudando para concursos, mas sente que não sai do lugar? Que parece estar sempre perdido, sem saber se o que está fazendo realmente funciona? A verdade é que a maioria dos concurseiros começa errado, pulando de método em método, estudando sem organização e perdendo tempo com coisas que não trazem resultado.",
      "O Manual do Aprovado foi criado justamente para mudar essa realidade — por quem já passou por tudo isso e aprendeu na prática o que funciona de verdade para passar em concursos.",
      "Aqui você vai receber um passo a passo claro, prático e testado, que mostra exatamente o que fazer desde o primeiro dia de estudo até a aprovação.",
      "Você vai aprender a organizar seus estudos do jeito certo, com estratégias que aceleram o aprendizado e fazem você fixar o conteúdo com eficiência. Vai saber como revisar para não esquecer, como resolver questões para ganhar experiência e montar ciclos de estudo que otimizam seu tempo.",
      "Esse manual é para quem quer parar de perder tempo fazendo errado e finalmente ir direto ao que gera resultado. É para quem quer estudar com foco, segurança e saber que está no caminho certo.",
      "Ele foi feito por aprovados que passaram anos estudando errado, aprendendo na marra o que funciona e o que não funciona — e agora compartilham esse conhecimento com você, para que você não precise errar tanto quanto eles.",
      "Se você quer sair do lugar, eliminar a dúvida e acelerar sua aprovação, este manual em PDF é seu guia definitivo. Estude menos, estude melhor e conquiste sua vaga mais rápido!"
    ],
    checkout: CHECKOUT.manual,
    hasMentoriaFlow: false
  },
  "legislacao-interna-tjsp-2025": {
    slug: "legislacao-interna-tjsp-2025",
    title: "Legislação Interna TJ-SP 2025",
    subtitle: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas",
    price: "R$ 79,00",
    img: "assets/legislacao.jpg",
    sample: SAMPLES.legislacao, // novo
    copy: [
      "Se preparar para o concurso do Tribunal de Justiça de São Paulo exige muito mais do que decorar a lei seca: é preciso conhecer profundamente a legislação interna, os prazos, as competências, e os detalhes que caem com frequência nas provas.",
      "Pensando nisso, desenvolvemos o material Legislação Interna TJ-SP 2025, em formato PDF, organizado e visualmente acessível que reúne toda a legislação cobrada no edital de forma didática e prática.",
      "Aqui, você não vai perder tempo vasculhando textos longos e difíceis de entender: preparamos tabelas explicativas que destacam exatamente o que você precisa saber — prazos, quóruns, composições e competências — tudo organizado para facilitar seu aprendizado e memorização.",
      "Além disso, incluímos questões inéditas que foram cuidadosamente selecionadas para testar seu conhecimento e garantir que você esteja preparado para os tipos de perguntas que vão aparecer na prova.",
      "Este material é essencial para você que quer acertar o máximo em Legislação. Estude com foco, domine o que realmente cai no  e aumente suas chances de aprovação "
    ],
    checkout: CHECKOUT.legislacao,
    hasMentoriaFlow: false
  },
  "mentoria": {
    slug: "mentoria",
    title: "Mentoria",
    subtitle: "Mentoria personalizada para planejar e acelerar sua aprovação.",
    price: "A partir de R$ 149,00/mês",
    img: "assets/mentoria.jpg",
    sample: null, // sem amostra
    copy: [
      "Conseguir a aprovação em concursos públicos é um desafio que exige muito mais do que vontade: é preciso planejamento estratégico, organização, disciplina e acompanhamento correto — e é exatamente isso que nossa Mentoria oferece.",
      "Na Mentoria, você recebe um plano de estudos totalmente individualizado, elaborado especificamente para o seu perfil, considerando seu tempo disponível, o concurso que você pretende prestar, seu nível atual em cada matéria e o peso das disciplinas no edital.",
      "O plano é acessado por uma plataforma, onde suas metas diárias são divididas em teoria, revisão e resolução de questões.",
      "Mas não para por aí: você terá suporte direto e pessoal comigo, seu mentor, via WhatsApp. Pode tirar dúvidas, pedir orientações e receber feedback sempre que precisar, 7 dias por semana.",
      "Oferecemos a mentoria com duas opções: com material completo do Estratégia Concursos; ou apenas o plano e o acompanhamento.",
      "Fazemos uma reunião inicial para entender suas necessidades e objetivos, garantindo que seu plano seja realmente personalizado.",
      "Se você quer deixar de estudar sem rumo, a Mentoria é sua solução para acelerar sua preparação com foco e estratégia."
    ],
    checkout: null,
    hasMentoriaFlow: true
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
    root.innerHTML = `<div class="text-center text-blue-50/85">
      Produto não encontrado. <a class="underline hover:text-white" href="index.html">Voltar</a>
    </div>`;
    wa.style.display = "none";
    return;
  }

  // WhatsApp float link
  wa.href = WA_LINK;

  const p = PRODUCTS[slug];

  // Cabeçalho do produto
  const head = `
    <div class="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
      <div class="rounded-2xl overflow-hidden shadow-xl bg-white/5 ring-1 ring-white/10">
        <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover">
      </div>
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-blue-50">${p.title}</h1>
        <p class="mt-2 text-blue-50/90">${p.subtitle}</p>
        <div class="mt-3 inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
          <span class="text-sm text-blue-50/85">Compra garantida • Entrega imediata</span>
        </div>
      </div>
    </div>
  `;

  // Texto (mais contraste)
  const copyHtml = p.copy.map(par => `<p class="leading-relaxed text-blue-50/95">${par}</p>`).join("");

  // Seção de compra
  let buySection = "";
  if (p.hasMentoriaFlow) {
    buySection = `
      <div class="space-y-3" id="mentoria-flow">
        <button class="btn-primary w-full md:w-auto" id="b1">Comprar Agora</button>
        <div class="hidden gap-3" id="step1">
          <button class="btn-secondary" data-opt="material">Mentoria com material</button>
          <button class="btn-secondary" data-opt="sem">Mentoria sem material</button>
        </div>
        <div class="hidden gap-3" id="step2">
          <a class="btn-primary" id="mensal" href="#" target="_blank" rel="noopener">Plano mensal</a>
          <a class="btn-primary" id="trimestral" href="#" target="_blank" rel="noopener">Plano trimestral</a>
        </div>
      </div>
      <script>
        (function(){
          const b1 = document.getElementById('b1');
          const s1 = document.getElementById('step1');
          const s2 = document.getElementById('step2');
          const mensal = document.getElementById('mensal');
          const trimestral = document.getElementById('trimestral');
          let variante = null;

          b1.addEventListener('click', ()=>{
            s1.classList.remove('hidden');
            b1.classList.add('hidden');
          });

          s1.addEventListener('click', (e)=>{
            const opt = e.target?.dataset?.opt;
            if(!opt) return;
            variante = opt;
            s2.classList.remove('hidden');
            // set links
            if (variante === 'material') {
              mensal.href = '${CHECKOUT.mentoria_material_mensal}';
              trimestral.href = '${CHECKOUT.mentoria_material_trimestral}';
            } else {
              mensal.href = '${CHECKOUT.mentoria_sem_material_mensal}';
              trimestral.href = '${CHECKOUT.mentoria_sem_material_trimestral}';
            }
          });
        })();
      </script>
    `;
  } else {
    // Produtos comuns: Comprar + Ver amostra
    const sampleBtn = p.sample
      ? `<a class="btn-outline w-full md:w-auto" href="${p.sample}" target="_blank" rel="noopener">Ver amostra</a>`
      : "";
    buySection = `
      <div class="flex flex-col md:flex-row gap-3">
        <a class="btn-primary w-full md:w-auto" href="${p.checkout}" target="_blank" rel="noopener">Comprar Agora</a>
        ${sampleBtn}
      </div>
    `;
  }

  // Dúvidas + Voltar
  const auxBtns = `
    <div class="flex flex-col md:flex-row gap-3">
      <a class="btn-ghost" href="index.html">Voltar</a>
      <a class="btn-outline" href="${WA_LINK}" target="_blank" rel="noopener">Ainda tem dúvidas? Clique aqui</a>
    </div>
  `;

  // Render final
  const html = `
    ${head}
    <div class="mt-8 space-y-6">
      ${copyHtml}
      <div class="text-lg font-semibold mt-4 text-blue-50">Preço: <span class="text-blue-50/95">${p.price}</span></div>
      <div class="mt-4 flex flex-col gap-3">
        ${buySection}
        ${auxBtns}
      </div>
    </div>
  `;

  document.getElementById("product-root").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderProduct);
