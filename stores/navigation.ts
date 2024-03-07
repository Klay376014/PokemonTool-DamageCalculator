export const useNavigationStore = defineStore('navigation', () => {
  const drawer = ref(false)

  return {
    drawer
  }
})
