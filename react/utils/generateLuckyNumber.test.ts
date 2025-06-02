import { generateLuckyNumber } from './generateLuckyNumber'

describe('generateLuckyNumber', () => {
  it('debe retornar un string con el formato XX-XX-XXXX', () => {
    const result = generateLuckyNumber()
    expect(result).toMatch(/^\d{2}-\d{2}-\d{4}$/)
  })

  it('genera diferentes números en diferentes llamadas', () => {
    const first = generateLuckyNumber()
    const second = generateLuckyNumber()
    expect(first).not.toBe(second)
  })
})
