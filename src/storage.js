export const StorageModule = {
  setItem: (key, value) => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value)
    }
  },

  getItem: (key) => {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },

  removeItem: (key) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  }
}
