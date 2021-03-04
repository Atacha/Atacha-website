const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
})

export default function formatMoney(valor: number) {
  return formatter.format(valor)
}
