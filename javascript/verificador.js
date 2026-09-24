document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('link-input');
  const verifyButton = document.getElementById('verifyBtn');
  const resultsContainer = document.getElementById('resultsContainer');
  const resultCard = document.getElementById('cardResultBox');
  const resultIconContainer = document.getElementById('resultIconContainer');
  const resultTitle = document.getElementById('resultTitle');
  const resultSubtitle = document.getElementById('resultSubtitle');
  const riskPercentage = document.getElementById('riskPercentage');
  const riskBarFill = document.getElementById('riskBarFill');
  const alertsContainer = document.getElementById('fraudAlertsContainer');

  const signals = {
    popularity: document.getElementById('sigPopularity'),
    age: document.getElementById('sigAge'),
    extension: document.getElementById('sigExtension'),
    ssl: document.getElementById('sigSsl'),
    scam: document.getElementById('sigScam')
  };

  const officialDomains = [
    'sallve.com.br',
    'yescosmetics.com.br',
    'sephora.com.br',
    'mundodocabeleireiro.com.br',
    'creamy.com.br',
    'boticario.com.br',
    'natura.com.br',
    'beleza-na-web.com.br',
    'epocacosmeticos.com.br',
    'drogaraia.com.br',
    'amazon.com.br'
  ];

  const suspiciousTerms = [
    'oferta', 'ofertao', 'desconto', 'promo', 'promocao', 'liquidacao',
    'gratis', 'premio', 'urgente', 'clique', 'presente', 'cupom', 'ganhe'
  ];

  const suspiciousTlds = ['.xyz', '.top', '.click', '.gq', '.tk', '.ml', '.cf', '.work', '.zip'];
  const trustedTlds = ['.com.br', '.com', '.org', '.net'];

  function normalizeText(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function extractUrl(value) {
    const candidate = value.trim();
    if (!candidate) return null;

    try {
      const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
      const url = new URL(withProtocol);
      if (!url.hostname || !url.hostname.includes('.')) return null;
      return url;
    } catch {
      return null;
    }
  }

  function getBaseDomain(hostname) {
    return hostname.toLowerCase().replace(/^www\./, '');
  }

  function isOfficialDomain(domain) {
    return officialDomains.some(official => domain === official || domain.endsWith(`.${official}`));
  }

  function setSignal(element, status, icon, label) {
    if (!element) return;
    element.className = `signal-status-badge ${status}`;
    element.innerHTML = `<i data-lucide="${icon}"></i> ${label}`;
  }

  function renderIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function setLoading(isLoading) {
    verifyButton.disabled = isLoading;
    verifyButton.classList.toggle('is-loading', isLoading);
    verifyButton.querySelector('span').textContent = isLoading ? 'ANALISANDO...' : 'VERIFICAR SEGURANÇA AGORA';
  }

  function showInvalidMessage() {
    resultsContainer.style.display = 'flex';
    resultCard.className = 'card-result-box result-invalid';
    resultIconContainer.className = 'result-icon-container result-invalid-icon';
    resultIconContainer.innerHTML = '<i data-lucide="circle-alert" class="result-main-icon"></i>';
    resultTitle.textContent = 'Não foi possível analisar';
    resultSubtitle.textContent = 'Digite uma URL válida, como https://www.exemplo.com.br.';
    riskPercentage.textContent = 'Aguardando um endereço válido';
    riskBarFill.style.width = '0%';
    alertsContainer.innerHTML = '<div class="fraud-alert-box invalid-alert">Cole o endereço completo do site ou escreva uma mensagem suspeita para que ela seja analisada.</div>';
    renderIcons();
  }

  function analyzeInput(rawValue) {
    const normalized = normalizeText(rawValue);
    const url = extractUrl(rawValue);
    const domain = url ? getBaseDomain(url.hostname) : '';
    const hostname = url ? url.hostname.toLowerCase() : '';
    const isOfficial = url && isOfficialDomain(domain);
    const hasHttps = Boolean(url && url.protocol === 'https:');
    const hasIpAddress = Boolean(url && /^(\d{1,3}\.){3}\d{1,3}$/.test(url.hostname));
    const hasAtSymbol = /https?:\/\/[^\s/]+@/i.test(rawValue);
    const suspiciousWordMatches = suspiciousTerms.filter(term => normalized.includes(term));
    const suspiciousTld = suspiciousTlds.some(tld => domain.endsWith(tld));
    const trustedTld = trustedTlds.some(tld => domain.endsWith(tld));
    const repeatedCharacters = Boolean(url && /(.)\1{3,}/i.test(url.hostname));
    const manySubdomains = Boolean(url && url.hostname.split('.').length > 4);
    const looksLikeMessage = !url && rawValue.trim().split(/\s+/).length > 1;
    const hasPricePattern = /r\$\s?\d+|\d+\s?reais|\d+%\s?(off|desconto)?/i.test(rawValue);

    let risk = 42;
    const alerts = [];

    if (isOfficial) {
      risk -= 35;
    } else if (url) {
      risk += 8;
    }
    if (hasHttps) risk -= 12;
    else if (url) { risk += 18; alerts.push('O site não usa HTTPS, então a conexão não está protegida da forma esperada.'); }
    if (trustedTld) risk -= 4;
    if (suspiciousTld) { risk += 30; alerts.push('A extensão do domínio é frequentemente associada a páginas descartáveis ou suspeitas.'); }
    if (hasIpAddress) { risk += 30; alerts.push('O endereço usa um IP em vez de um domínio comercial reconhecível.'); }
    if (hasAtSymbol) { risk += 35; alerts.push('O endereço contém um padrão que pode esconder o destino real antes do símbolo @.'); }
    if (repeatedCharacters) { risk += 15; alerts.push('O domínio possui caracteres repetidos de forma incomum.'); }
    if (manySubdomains) { risk += 12; alerts.push('O domínio possui muitos subdomínios, um padrão que merece atenção.'); }
    if (suspiciousWordMatches.length) {
      risk += Math.min(28, suspiciousWordMatches.length * 7);
      alerts.push(`Foram identificados termos de pressão ou promessa fácil: ${suspiciousWordMatches.slice(0, 3).join(', ')}.`);
    }
    if (looksLikeMessage && hasPricePattern) {
      risk += 22;
      alerts.push('A mensagem combina preço/oferta com possível urgência. Confirme a origem antes de pagar.');
    }
    if (!url && !looksLikeMessage) {
      risk += 10;
      alerts.push('O conteúdo não parece ser uma URL nem uma mensagem completa para análise.');
    }

    risk = Math.max(3, Math.min(97, risk));
    const level = risk <= 25 ? 'safe' : risk <= 55 ? 'attention' : 'danger';
    const reputation = isOfficial ? 'Loja oficial reconhecida' : level === 'safe' ? 'Baixo risco' : level === 'attention' ? 'Atenção necessária' : 'Alto risco';
    const title = level === 'safe' ? 'Conteúdo com baixo risco' : level === 'attention' ? 'Atenção antes de continuar' : 'Possíveis sinais de golpe';
    const subtitle = isOfficial
      ? 'O domínio corresponde a uma loja presente na nossa lista de referências.'
      : 'A análise local encontrou sinais que devem ser conferidos antes de clicar ou pagar.';

    return { url, domain, isOfficial, hasHttps, suspiciousTld, risk, level, reputation, title, subtitle, alerts };
  }

  function renderResult(result) {
    const themes = {
      safe: { card: 'result-safe', iconBox: 'result-safe-icon', icon: 'shield-check', bar: '#2F7A50' },
      attention: { card: 'result-attention', iconBox: 'result-attention-icon', icon: 'triangle-alert', bar: '#C58B28' },
      danger: { card: 'result-danger', iconBox: 'result-danger-icon', icon: 'shield-alert', bar: '#C53030' }
    };
    const theme = themes[result.level];

    resultsContainer.style.display = 'flex';
    resultCard.className = `card-result-box ${theme.card}`;
    resultIconContainer.className = `result-icon-container ${theme.iconBox}`;
    resultIconContainer.innerHTML = `<i data-lucide="${theme.icon}" class="result-main-icon"></i>`;
    resultTitle.textContent = result.title;
    resultSubtitle.textContent = result.subtitle;
    riskPercentage.textContent = `${result.reputation} (Nota: ${Math.round(10 - result.risk / 12.5)}/10)`;
    riskBarFill.style.width = `${result.risk}%`;
    riskBarFill.style.backgroundColor = theme.bar;

    const messages = result.alerts.length
      ? result.alerts
      : ['Nenhum alerta crítico foi encontrado nesta análise inicial. Mesmo assim, confirme a loja e o pagamento antes de prosseguir.'];
    alertsContainer.innerHTML = messages.map(message => `<div class="fraud-alert-box ${result.level}-alert"><i data-lucide="${result.level === 'safe' ? 'check-circle-2' : 'alert-triangle'}"></i><span>${message}</span></div>`).join('');

    setSignal(signals.popularity, result.isOfficial || result.level === 'safe' ? 'safe' : result.level === 'attention' ? 'attention' : 'danger', result.isOfficial ? 'badge-check' : 'search-check', result.isOfficial ? 'Referência conhecida' : result.level === 'safe' ? 'Sem alerta' : 'Verificar');
    setSignal(signals.age, result.isOfficial ? 'safe' : result.level === 'danger' ? 'danger' : 'attention', result.isOfficial ? 'history' : 'clock-3', result.isOfficial ? 'Consolidado' : result.level === 'danger' ? 'Desconhecido' : 'Não confirmado');
    setSignal(signals.extension, result.suspiciousTld ? 'danger' : result.url ? 'safe' : 'attention', result.suspiciousTld ? 'octagon-alert' : 'tag', result.suspiciousTld ? 'Suspeita' : result.url ? 'Compatível' : 'Texto');
    setSignal(signals.ssl, result.url && result.hasHttps ? 'safe' : result.url ? 'danger' : 'attention', result.url && result.hasHttps ? 'lock-keyhole' : 'unlock-keyhole', result.url && result.hasHttps ? 'HTTPS ativo' : result.url ? 'Sem HTTPS' : 'Não aplicável');
    setSignal(signals.scam, result.level === 'safe' ? 'safe' : result.level === 'attention' ? 'attention' : 'danger', result.level === 'safe' ? 'shield-check' : 'shield-alert', result.level === 'safe' ? 'Sem sinais' : result.level === 'attention' ? 'Requer cuidado' : 'Sinais encontrados');
    renderIcons();
  }

  function verify() {
    const value = input.value.trim();
    if (!value) {
      showInvalidMessage();
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      const result = analyzeInput(value);
      renderResult(result);
      setLoading(false);
    }, 450);
  }

  verifyButton.addEventListener('click', verify);
  input.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') verify();
  });
});
