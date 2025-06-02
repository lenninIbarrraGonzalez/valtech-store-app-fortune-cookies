import { fetchFortuneCookies } from './fetchFortuneCookies'

const mockCookies = [
  { id: '1', CookieFortune: '¡Hoy es tu día de suerte!' },
  { id: '2', CookieFortune: 'La fortuna sonríe a los valientes.' },
]

describe('fetchFortuneCookies', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('devuelve la lista de galletas cuando la respuesta es exitosa', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCookies,
    })

    const result = await fetchFortuneCookies()
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/dataentities/CF/search?_fields=id,CookieFortune&_from=0&_to=99',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
    )
    expect(result).toEqual(mockCookies)
  })

  it('lanza un error si la respuesta no es ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    })

    await expect(fetchFortuneCookies()).rejects.toThrow()
  })
})
