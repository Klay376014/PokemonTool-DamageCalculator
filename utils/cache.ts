type CacheDataResponse<V> = {
  success: true
  value: V
} | {
  success: false
}

interface Node<K, V> {
  key: K
  value: V
  next?: Node<K, V>
  prev?: Node<K, V>
}

interface ICache<K, V> {
  limit: number
  data: Map<K, Node<K, V>>
  get: (key: K) => CacheDataResponse<V>
  set: (key: K, value: V) => void
}

export class Cache<K, V> implements ICache<K, V> {
  data = new Map<K, Node<K, V>>()
  private head?: Node<K, V>
  private tail?: Node<K, V>
  private counts: number = 0
  constructor(public limit = 50) {}
  get(key: K): CacheDataResponse<V> {
    const cachedData = this.data.get(key)
    if (!cachedData)
      return { success: false }

    if (this.head && this.head?.key !== cachedData.key) {
      if (cachedData.prev)
        cachedData.prev.next = cachedData.next
      if (cachedData.next) {
        cachedData.next.prev = cachedData.prev
      }
      else {
        // is tail
        const newTail = cachedData.prev!
        newTail.next = undefined
        this.tail = newTail
      }
      cachedData.prev = undefined
      this.head.prev = cachedData
      cachedData.next = this.head
      this.head = cachedData
    }
    return {
      success: true,
      value: cachedData.value,
    }
  }

  set(key: K, value: V) {
    const newNode: Node<K, V> = {
      key,
      value
    }
    if (!this.data.has(key))
      this.counts++

    this.data.set(key, newNode)
    if (!this.head) {
      this.head = this.tail = newNode
    }
    else {
      const curHead = this.head
      curHead.prev = newNode
      newNode.next = curHead
      this.head = newNode
    }

    if (this.counts > this.limit) {
      const prevTail = this.tail!
      if (!prevTail)
        return

      const newTail = prevTail.prev
      if (!newTail)
        return

      newTail.next = undefined
      this.tail = newTail
      prevTail.prev = undefined
      this.counts--
      this.data.delete(prevTail.key)
    }
  }
}
