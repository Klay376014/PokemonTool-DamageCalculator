export const useNavigationStore = defineStore('navigation', () => {
  const condition = ref(false)

  return {
    condition
  }
})
