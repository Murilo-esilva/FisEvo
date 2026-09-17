(() => {
  const TIMEOUT_MS = 15000;
  let finished = false;

  const get = (selector) => document.querySelector(selector);
  const hideLoader = () => {
    const loader = get('#loader');
    if (loader) loader.hidden = true;
  };

  function explain(error) {
    const message = String(error?.message || error || 'Erro desconhecido');
    if (/config\.js|module|import|failed to fetch dynamically/i.test(message)) {
      return 'Não foi possível carregar a configuração ou um módulo JavaScript. Verifique se js/config.js foi publicado pelo GitHub Actions.';
    }
    if (/profiles|rls|permission|row level|relation/i.test(message)) {
      return 'Não foi possível consultar o perfil. Verifique a tabela profiles e as políticas RLS do Supabase.';
    }
    if (/network|fetch|timeout|connection/i.test(message)) {
      return 'Falha de conexão com o Supabase. Verifique a rede e tente novamente.';
    }
    return `Não foi possível iniciar o FisEvo: ${message}`;
  }

  function showError(error) {
    if (finished) return;
    finished = true;
    hideLoader();
    const app = get('#app');
    if (app) app.hidden = false;
    const nav = get('#bottom-nav');
    if (nav) nav.hidden = true;

    let panel = get('#startup-error');
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'startup-error';
      panel.className = 'panel startup-error';
      panel.setAttribute('role', 'alert');
      (app || document.body).prepend(panel);
    }
    panel.innerHTML = `<h2>Falha ao iniciar o FisEvo</h2><p>${explain(error)}</p><button class="btn primary" type="button" id="retry-startup">Tentar novamente</button>`;
    get('#retry-startup')?.addEventListener('click', () => window.location.reload());
    console.error('[FisEvo] Falha de inicialização:', error);
  }

  window.addEventListener('error', (event) => showError(event.error || new Error(event.message)));
  window.addEventListener('unhandledrejection', (event) => showError(event.reason));

  const check = window.setInterval(() => {
    const loader = get('#loader');
    if (loader?.hidden) {
      finished = true;
      window.clearInterval(check);
    }
  }, 100);

  window.setTimeout(() => {
    window.clearInterval(check);
    if (!finished && !get('#loader')?.hidden) {
      showError(new Error('Tempo limite excedido após 15 segundos.'));
    }
  }, TIMEOUT_MS);
})();
