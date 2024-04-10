export const useNavigationStore = defineStore('navigation', () => {
  const condition = ref(false)
  const damage = ref(false)

  return {
    condition,
    damage
  }
})
