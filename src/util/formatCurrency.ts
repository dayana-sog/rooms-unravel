export function formatCurrency(amount: number, currencyCode: string) {
  const formattedNumber = new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);

  return `${currencyCode}${formattedNumber}`;
}