const defaultConfig = {
  baseRate: 500,
  czRate: 1420,
  plHourlyRate: 73
};

export function loadConfig() {
  const saved = localStorage.getItem('config');
  if (saved) return JSON.parse(saved);
  return defaultConfig;
}

export function saveConfig(config) {
  localStorage.setItem('config', JSON.stringify(config));
}