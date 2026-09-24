document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('aiChatToggle');
  const close = document.getElementById('aiChatClose');
  const box = document.getElementById('aiChatBox');
  const messages = document.getElementById('aiChatMessages');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiChatInput');
  const chips = document.querySelectorAll('.ai-chip');

  if (!toggle || !close || !box || !messages || !form || !input) return;

  const addMessage = (text, author = 'bot') => {
    const message = document.createElement('div');
    message.className = `ai-message ${author}`;
    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    bubble.textContent = text;
    message.appendChild(bubble);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const getResponse = question => {
    const text = normalize(question);
    if (text.includes('tom de pele') || text.includes('pele clara') || text.includes('pele media') || text.includes('pele escura')) {
      return 'Para indicar base, corretivo ou blush pelo tom de pele, preciso saber se sua pele é clara, média ou escura e se o subtom é quente, frio ou neutro. Também vale testar a cor no maxilar, em luz natural, e comprar de lojas oficiais.';
    }
    if (text.includes('cabelo') || text.includes('cacheado') || text.includes('crespo') || text.includes('liso') || text.includes('ondulado')) {
      return 'Para cabelos lisos, ondulados, cacheados ou crespos, posso ajudar a buscar shampoo, máscara, finalizador ou protetor térmico. Diga seu tipo de fio e a principal necessidade: hidratação, definição, controle de frizz, reconstrução ou proteção.';
    }
    if (text.includes('produto') || text.includes('busca') || text.includes('procuro') || text.includes('indicacao') || text.includes('indicação')) {
      return 'Claro! Que tipo de produto você busca: skincare, maquiagem, cabelo, perfume, higiene ou proteção solar? Se puder, diga também seu objetivo e sua faixa de preço para eu orientar melhor.';
    }
    if (text.includes('oleosa') || text.includes('seca') || text.includes('sensivel') || text.includes('sensível') || text.includes('acne')) {
      return 'Para pele oleosa, procure texturas leves e não comedogênicas; para pele seca, fórmulas hidratantes; para pele sensível, poucos ativos e fragrância reduzida. Faça teste em pequena área e confirme a procedência do produto.';
    }
    if (text.includes('comprar') || text.includes('segur') || text.includes('loja') || text.includes('golpe')) {
      return 'Para comprar com segurança, confira o domínio, use HTTPS, desconfie de descontos extremos, evite pagamentos fora da plataforma e prefira as lojas verificadas listadas nesta página. O verificador pode analisar o link antes da compra.';
    }
    if (text.includes('preco') || text.includes('preço') || text.includes('barato') || text.includes('orcamento') || text.includes('orçamento')) {
      return 'Posso ajudar a comparar opções por faixa de preço. Informe o produto que você quer e o orçamento máximo. Lembre-se: preço muito abaixo do mercado é um sinal para investigar a loja.';
    }
    return 'Entendi. Para recomendar melhor, conte o produto que você procura, seu tipo de pele ou cabelo, sua principal necessidade e, se quiser, sua faixa de preço.';
  };

  const ask = question => {
    const value = question.trim();
    if (!value) return;
    addMessage(value, 'user');
    input.value = '';
    window.setTimeout(() => addMessage(getResponse(value)), 350);
  };

  toggle.addEventListener('click', () => {
    const open = box.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(open));
    if (open) window.setTimeout(() => input.focus(), 250);
  });

  close.addEventListener('click', () => {
    box.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  });

  chips.forEach(chip => chip.addEventListener('click', () => ask(chip.dataset.question || chip.textContent)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    ask(input.value);
  });
});
