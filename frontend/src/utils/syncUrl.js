export default function syncUrl(paramKey, value) {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(paramKey, value);
  } else {
    url.searchParams.delete(paramKey);
  }
  window.history.pushState({}, "", url);
}
