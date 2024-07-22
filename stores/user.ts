import type { Pokemon } from 'vgc_data_wrapper'

export const useUserStore = defineStore('user', () => {
  type PokemonWithNote = Pokemon & { note: string }
  
  const loadedPokemon = ref<PokemonWithNote[]>([]) 
  const supabase = useSupabaseClient()
  const account = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const uuid = ref('')
  const firstEntry = ref(false)

  const login = async () => {
    isLoading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email: account.value,
      password: password.value
    })

    uuid.value = data.user.id
    isLoading.value = false
    // 無資料代表為尚未儲存過資料的用戶
    if (await checkHasData()) firstEntry.value = true
  }

  const getUuid = () => {
    return uuid.value
  }

  const saveData = async (json: string) => {
    if (!uuid.value) return

    console.log(firstEntry.value)
    if (firstEntry.value) {
      const { data, error } = await supabase
      .from('save_pokemon')
      .insert(
        { uuid: uuid.value, data: json},
        { returning: 'Wminimal' }
      )
      if (!error) firstEntry.value = false
    } else {
      const { data, error } = await supabase
      .from('save_pokemon')
      .update({ data: json })
      .eq('uuid', uuid.value)
    }
    
  }

  const checkHasData = async () => {
    if (!uuid.value) return false

    
    const { data: save_pokemon, error } = await supabase
    .from('save_pokemon')
    .select('data')
    .eq('uuid', uuid.value)

    if (!save_pokemon) return true

    loadedPokemon.value = JSON.parse(save_pokemon[0].data) as PokemonWithNote[]
    return false
  }

  return {
    loadedPokemon,
    supabase,
    account,
    password,
    isLoading,
    login,
    getUuid,
    saveData
  }
})