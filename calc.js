export function calculateHoursWorked(daysWorked, baseRate, czRate, plHourlyRate) {
  const netto = daysWorked * baseRate - czRate;
  const hoursRaw = netto / plHourlyRate;
  const hoursInt = Math.floor(hoursRaw);
  const minutes = (hoursRaw - hoursInt) * 100;

  let fractional = 0;
  if (minutes <= 30) fractional = 0.25;
  else if (minutes <= 50) fractional = 0.5;
  else fractional = 0.75;

  const hoursRounded = hoursInt + fractional;
  return { netto, hoursRaw, hoursRounded };
}