// JS de cliente mínimo y opcional: la web funciona sin él. Un solo fichero externo (CSP script-src 'self').
const root = document.documentElement;
const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* modo privado */ } },
};

// Interruptor FX (scanlines, glitch, animaciones). Solo localStorage, sin cookies.
const applyFx = (v: string) => { root.dataset.fx = v; document.querySelectorAll<HTMLButtonElement>('[data-fx-toggle]').forEach((b) => { b.setAttribute('aria-pressed', String(v === 'on')); b.textContent = `FX: ${v.toUpperCase()}`; }); };
applyFx(store.get('fx') === 'off' ? 'off' : 'on');
document.querySelectorAll('[data-fx-toggle]').forEach((b) => b.addEventListener('click', () => { const v = root.dataset.fx === 'off' ? 'on' : 'off'; store.set('fx', v); applyFx(v); }));

// Pantalla de arranque: una vez por sesión, solo en la home, omitible, <1.2 s.
const boot = document.querySelector<HTMLElement>('[data-boot]');
if (boot && !matchMedia('(prefers-reduced-motion: reduce)').matches && root.dataset.fx !== 'off') {
  let seen = false; try { seen = sessionStorage.getItem('boot') === '1'; sessionStorage.setItem('boot', '1'); } catch { /* ignorar */ }
  if (!seen) {
    boot.classList.add('on');
    const done = () => boot.classList.remove('on');
    setTimeout(done, 1100);
    boot.addEventListener('click', done);
    addEventListener('keydown', done, { once: true });
  }
}

// Artículos: cabecera de bloque de código con lenguaje y botón de copiar.
document.querySelectorAll<HTMLPreElement>('.prose-arcade pre').forEach((pre) => {
  const head = document.createElement('div');
  head.className = 'code-head';
  const lang = document.createElement('span');
  lang.textContent = `$ ${pre.dataset.language ?? 'text'}`;
  const btn = document.createElement('button');
  btn.type = 'button'; btn.textContent = 'COPIAR';
  btn.setAttribute('aria-label', 'Copiar código al portapapeles');
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pre.innerText); btn.textContent = 'OK'; } catch { btn.textContent = 'ERROR'; }
    setTimeout(() => (btn.textContent = 'COPIAR'), 1500);
  });
  head.append(lang, btn);
  pre.before(head);
});

// Filtros combinables de artículos: OR dentro de una categoría, AND entre categorías.
const filterList = document.querySelector<HTMLElement>('[data-post-filter-list]');
if (filterList) {
  const cards = [...filterList.querySelectorAll<HTMLElement>('[data-post-card]')];
  const options = [...document.querySelectorAll<HTMLAnchorElement>('[data-post-filter]')];
  const reset = document.querySelector<HTMLButtonElement>('[data-post-filter-reset]');
  const status = document.querySelector<HTMLElement>('[data-post-filter-status]');
  const empty = filterList.querySelector<HTMLElement>('[data-post-filter-empty]');
  const pagination = document.querySelector<HTMLElement>('[data-post-pagination]');
  const pageSizeSelect = document.querySelector<HTMLSelectElement>('[data-post-page-size]');
  const pageNav = document.querySelector<HTMLElement>('[data-post-page-nav]');
  const previousPage = document.querySelector<HTMLButtonElement>('[data-post-page-previous]');
  const nextPage = document.querySelector<HTMLButtonElement>('[data-post-page-next]');
  const pageIndicator = document.querySelector<HTMLElement>('[data-post-page-indicator]');
  const selected = new Map<string, Set<string>>();
  let page = 1;

  const update = () => {
    const matches = cards.filter((card) => {
      const matches = [...selected].every(([taxonomy, terms]) => {
        const values = (card.dataset[taxonomy] ?? '').split(' ');
        return [...terms].some((term) => values.includes(term));
      });
      return matches;
    });
    const pageSize = pageSizeSelect?.value === 'all'
      ? matches.length || 1
      : Number(pageSizeSelect?.value) || 10;
    const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
    page = Math.min(page, pageCount);
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, matches.length);
    const visibleCards = new Set(matches.slice(start, end));

    for (const card of cards) {
      card.hidden = !visibleCards.has(card);
    }

    for (const option of options) {
      const active = selected.get(option.dataset.taxonomy ?? '')?.has(option.dataset.term ?? '') ?? false;
      option.setAttribute('aria-pressed', String(active));
      const mark = option.querySelector<HTMLElement>('[data-filter-mark]');
      if (mark) mark.textContent = active ? '[x]' : '[ ]';
    }

    if (reset) {
      reset.hidden = selected.size === 0;
      reset.classList.toggle('hidden', selected.size === 0);
    }
    if (empty) empty.hidden = matches.length > 0;
    if (status) {
      status.textContent = matches.length
        ? `Mostrando ${start + 1}–${end} de ${matches.length} artículos${matches.length !== cards.length ? ` (${cards.length} en total)` : ''}`
        : 'No hay artículos que coincidan con los filtros seleccionados.';
    }
    if (pagination) {
      pagination.hidden = cards.length === 0;
      pagination.classList.toggle('hidden', cards.length === 0);
    }
    if (pageNav) {
      pageNav.hidden = pageCount <= 1;
      pageNav.classList.toggle('hidden', pageCount <= 1);
    }
    if (previousPage) previousPage.disabled = page <= 1;
    if (nextPage) nextPage.disabled = page >= pageCount;
    if (pageIndicator) pageIndicator.textContent = `Página ${page} de ${pageCount}`;
  };

  for (const option of options) {
    option.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        option.click();
      }
    });
    option.addEventListener('click', (event) => {
      event.preventDefault();
      const taxonomy = option.dataset.taxonomy;
      const term = option.dataset.term;
      if (!taxonomy || !term) return;

      const terms = selected.get(taxonomy) ?? new Set<string>();
      if (terms.has(term)) terms.delete(term);
      else terms.add(term);

      if (terms.size) selected.set(taxonomy, terms);
      else selected.delete(taxonomy);
      page = 1;
      update();
    });
  }

  pageSizeSelect?.addEventListener('change', () => {
    page = 1;
    update();
  });
  previousPage?.addEventListener('click', () => {
    page--;
    update();
  });
  nextPage?.addEventListener('click', () => {
    page++;
    update();
  });
  reset?.addEventListener('click', () => {
    selected.clear();
    page = 1;
    update();
  });

  update();
}
