import { openDB, IDBPDatabase } from 'idb'
import { DateTime } from 'luxon'

interface CachedTimezone {
  id: string
  offset: number
  name: string
  timestamp: number
}

const DB_NAME = 'timezone-converter'
const STORE_NAME = 'timezones'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export function useTimezoneCache() {
  let db: IDBPDatabase | null = null

  const initDB = async () => {
    if (!process.client) return null
    
    db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
    })
    return db
  }

  const getCachedTimezone = async (timezone: string): Promise<CachedTimezone | null> => {
    if (!db) await initDB()
    if (!db) return null

    const cached = await db.get(STORE_NAME, timezone)
    if (!cached) return null

    // Check if cache is still valid
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      await db.delete(STORE_NAME, timezone)
      return null
    }

    return cached
  }

  const cacheTimezone = async (timezone: string) => {
    if (!db) await initDB()
    if (!db) return

    const now = DateTime.now()
    const zoned = now.setZone(timezone)
    if (!zoned.isValid) return

    const data: CachedTimezone = {
      id: timezone,
      offset: zoned.offset,
      name: zoned.zoneName,
      timestamp: Date.now()
    }

    await db.put(STORE_NAME, data)
  }

  const clearCache = async () => {
    if (!db) await initDB()
    if (!db) return

    await db.clear(STORE_NAME)
  }

  return {
    getCachedTimezone,
    cacheTimezone,
    clearCache
  }
}