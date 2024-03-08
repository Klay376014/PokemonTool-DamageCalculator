import type { Battle } from 'vgc_data_wrapper'

export const useFieldStore = defineStore('field', () => {
  type Weather = NonNullable<Battle['field']['weather']>
  type Terrain = NonNullable<Battle['field']['terrain']>
  type Aura = NonNullable<Battle['field']['aura']>[number]
  type Ruin = NonNullable<Battle['field']['ruin']>[number]
  type MaybeField<T> = T | 'None'

  const weather: Ref<MaybeField<Weather>> = ref('None')
  const terrain: Ref<MaybeField<Terrain>> = ref('None')
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
