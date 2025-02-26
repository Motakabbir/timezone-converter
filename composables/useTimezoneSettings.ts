interface TimezoneSettings {
  recentTimezones: string[]
  sourceZone: string
  targetZone: string
  analytics: boolean
}

export function useTimezoneSettings() {
  const { addToast } = useToast()

  const exportSettings = () => {
    try {
      const settings: TimezoneSettings = {
        recentTimezones: useTimezoneStore().recentTimezones,
        sourceZone: localStorage.getItem('last-source-zone') || '',
        targetZone: localStorage.getItem('last-target-zone') || '',
        analytics: localStorage.getItem('analytics-preference') === 'accepted'
      }

      const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'timezone-settings.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      addToast('Settings exported successfully', 'success')
    } catch (error) {
      addToast('Failed to export settings', 'error')
      console.error('Export error:', error)
    }
  }

  const importSettings = async (file: File) => {
    try {
      const text = await file.text()
      const settings: TimezoneSettings = JSON.parse(text)
      
      const store = useTimezoneStore()
      store.$reset()
      settings.recentTimezones.forEach(tz => store.addRecentTimezone(tz))
      
      if (settings.sourceZone) {
        localStorage.setItem('last-source-zone', settings.sourceZone)
      }
      if (settings.targetZone) {
        localStorage.setItem('last-target-zone', settings.targetZone)
      }
      
      localStorage.setItem(
        'analytics-preference',
        settings.analytics ? 'accepted' : 'rejected'
      )

      addToast('Settings imported successfully', 'success')
      return true
    } catch (error) {
      addToast('Failed to import settings', 'error')
      console.error('Import error:', error)
      return false
    }
  }

  return {
    exportSettings,
    importSettings
  }
}