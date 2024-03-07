import { Battle } from 'vgc_data_wrapper'

export const useFieldStore = defineStore('field', () => {
  type Weather = 'Sun' | 'Rain' | 'Sand' | 'Snow'
  type Terrain = 'Electric' | 'Grassy' | 'Misty' | 'Psychic'
  type Aura = 'Fairy' | 'Dark'
  type Ruin = 'Tablets' | 'Sword' | 'Vessel' | 'Beads'

  const weather: Ref<Weather | 'None'> = ref('None')
  const terrain: Ref<Terrain | 'None'> = ref('None')
  const aura: Ref<Aura[]> = ref([])
  const ruin: Ref<Ruin[]> = ref([])
  const isDouble: Ref<boolean> = ref(true)

  return {
    weather,
    terrain,
    aura,
    ruin,
    isDouble
  }
})
