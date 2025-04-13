import { calculateHoursWorked } from './calc.js';
import { loadConfig, saveConfig } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const config = loadConfig();
  document.getElementById('baseRateInput').value = config.baseRate;
  document.getElementById('czRateInput').value = config.czRate;
  document.getElementById('plRateInput').value = config.plHourlyRate;

  document.getElementById('calculateBtn').addEventListener('click', () => {
    const employeeName = document.getElementById('employeeName').value;
    const month = document.getElementById('monthInput').value;
    const daysWorked = Number(document.getElementById('daysInput').value);
    const baseRate = Number(document.getElementById('baseRateInput').value);
    const czRate = Number(document.getElementById('czRateInput').value);
    const plRate = Number(document.getElementById('plRateInput').value);

    const result = calculateHoursWorked(daysWorked, baseRate, czRate, plRate);
    document.getElementById('employeeResult').textContent = employeeName;
    document.getElementById('nettoResult').textContent = result.netto.toFixed(2);
    document.getElementById('hoursResult').textContent = result.hoursRounded.toFixed(2);

    saveConfig({ baseRate, czRate, plHourlyRate: plRate });

    window.lastResult = {
      employeeName,
      month,
      netto: result.netto.toFixed(2)
    };
  });

  document.getElementById('exportPdfBtn').addEventListener('click', () => {
    const { employeeName, month, netto } = window.lastResult || {};
    if (!employeeName || !month || !netto) {
      alert('Najpierw kliknij "Oblicz"!');
      return;
    }
    window.electronAPI.exportPdf({ employeeName, month, netto });
  });
});