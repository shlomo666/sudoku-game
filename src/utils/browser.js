export function getQueryParams() {
  return Object.fromEntries(
    window.location.search
      .slice(1)
      .split('&')
      .map(pair => pair.split('='))
  );
}

export function onPopState(fn) {
  window.onpopstate = ev => {
    fn(ev.state);
  };
}
