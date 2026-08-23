const EXCLUDE_KEY = 'goatcounter_exclude';

export function initAnalytics(): void {
  const params = new URLSearchParams(window.location.search);

  if (params.get('exclude') === '1') {
    localStorage.setItem(EXCLUDE_KEY, '1');
    params.delete('exclude');
    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, '', nextUrl);
  }

  if (params.get('exclude') === '0') {
    localStorage.removeItem(EXCLUDE_KEY);
  }

  if (localStorage.getItem(EXCLUDE_KEY)) {
    return;
  }

  const endpoint = import.meta.env.VITE_GOATCOUNTER_ENDPOINT ?? 'https://nickgardi.goatcounter.com/count';

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = endpoint;
  script.dataset.goatcounterSettings = JSON.stringify({ allow_local: false });
  document.head.appendChild(script);
}
