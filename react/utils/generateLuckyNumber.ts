export function generateLuckyNumber(): string {
  const getRandom = (length: number) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("")
  return `${getRandom(2)}-${getRandom(2)}-${getRandom(4)}`
}
