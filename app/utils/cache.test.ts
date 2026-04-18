import { expect, it } from 'vitest'
import { Cache } from './cache'

it('can get correct data from cache after set', () => {
  const store = new Cache<string, string>(1)
  expect(store.get('foo').success).toBe(false)
  store.set('foo', 'bar')
  const value = store.get('foo')
  expect(value.success).toBe(true)
  if (value.success)
    expect(value.value).toBe('bar')
})

it('if limit is exceeded, remove least used', () => {
  const store = new Cache<string, string>(2)
  store.set('foo', 'bar')
  store.set('bar', 'baz')
  //   current least used is foo
  store.set('baz', 'foo')
  expect(store.get('foo').success).toBe(false)
  store.get('bar')
  //     current least used is baz
  store.set('foo', 'bar')
  expect(store.get('baz').success).toBe(false)
})
