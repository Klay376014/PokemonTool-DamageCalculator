import { rotomDexFormSchema } from '~/utils/schema'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  const config = useRuntimeConfig()

  const raw = await $fetch(`${config.rotomDexBaseUrl}/api/v1/pokemon/forms/${name}`)
  const parsed = rotomDexFormSchema.safeParse(raw)
  if (!parsed.success) {
    throw createError({ statusCode: 502, message: 'Invalid response from rotom-dex' })
  }

  return parsed.data
})
