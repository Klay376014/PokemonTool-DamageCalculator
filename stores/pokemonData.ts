// eslint-disable-next-line antfu/top-level-function
export const usePokemonDataStore = (id: string) => defineStore(id, () => {
  const name = ref('bulbasaur')
  const imgUrl = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png')

  const baseStat = ref<Stats>({
    hp: 45,
    atk: 49,
    def: 49,
    spa: 65,
    spd: 65,
    spe: 45,
  })

  return {
    name,
    imgUrl,
    baseStat,
  }
})()
