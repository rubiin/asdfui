import { LRUCache } from 'lru-cache'


const options = {
  max: 500,
  // for use with tracking overall storage size
  maxSize: 5000,
  // how long to live in ms
  ttl: 1000 * 60 * 10
}

export const cache = new LRUCache(options)
