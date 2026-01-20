export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value)
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString()
}


