import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://beta.pokeapi.co/graphql/v1beta',
  documents: ['src/**/*.{ts,vue}', 'pages/**/*.{ts,vue}', 'composables/**/*.{ts,vue}', 'components/**/*.{ts,vue}'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './gql/': {
      preset: 'client'
    }
  }
}

export default config
