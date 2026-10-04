import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import * as Switch from '@radix-ui/react-switch'
import { X, Sun, Moon } from 'lucide-react'
import { useEditorStore } from '../store/editorStore'
import { useThemeStore } from '../store/themeStore'

export function SettingsPanel() {
  const showSettings = useEditorStore((s) => s.showSettings)
  const setShowSettings = useEditorStore((s) => s.setShowSettings)
  const settings = useEditorStore((s) => s.settings)
  const updateSettings = useEditorStore((s) => s.updateSettings)
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  return (
    <Dialog.Root open={showSettings} onOpenChange={setShowSettings}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Settings</h2>
            <Dialog.Close className="rounded-lg border border-slate-700 p-2 hover:bg-slate-900 transition">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <Tabs.Root defaultValue="general" className="w-full">
            <Tabs.List className="grid w-full grid-cols-3 rounded-lg border border-slate-800 bg-slate-900 p-1 mb-6">
              <Tabs.Trigger
                value="general"
                className="rounded-md px-4 py-2 text-sm text-slate-300 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100 transition"
              >
                General
              </Tabs.Trigger>
              <Tabs.Trigger
                value="appearance"
                className="rounded-md px-4 py-2 text-sm text-slate-300 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100 transition"
              >
                Appearance
              </Tabs.Trigger>
              <Tabs.Trigger
                value="project"
                className="rounded-md px-4 py-2 text-sm text-slate-300 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100 transition"
              >
                Project
              </Tabs.Trigger>
            </Tabs.List>

            {/* General Tab */}
            <Tabs.Content value="general" className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <div>
                  <p className="font-medium">Snap to Grid</p>
                  <p className="text-sm text-slate-400">Align clips to grid</p>
                </div>
                <Switch.Root
                  checked={settings.snapToGrid}
                  onCheckedChange={(checked) =>
                    updateSettings({ snapToGrid: checked })
                  }
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 data-[state=checked]:bg-blue-600"
                >
                  <Switch.Thumb className="block h-5 w-5 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-5" />
                </Switch.Root>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <label className="mb-2 block text-sm font-medium">Playback Speed</label>
                <select
                  value={settings.playbackSpeed}
                  onChange={(e) =>
                    updateSettings({ playbackSpeed: parseFloat(e.target.value) })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x (Normal)</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
            </Tabs.Content>

            {/* Appearance Tab */}
            <Tabs.Content value="appearance" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  <Moon className="h-6 w-6" />
                  <span className="text-sm font-medium">Dark</span>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  <Sun className="h-6 w-6" />
                  <span className="text-sm font-medium">Light</span>
                </button>
              </div>
            </Tabs.Content>

            {/* Project Tab */}
            <Tabs.Content value="project" className="space-y-4">
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <label className="mb-2 block text-sm font-medium">Frame Rate (FPS)</label>
                <select className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none">
                  <option>24 fps</option>
                  <option>30 fps</option>
                  <option>60 fps</option>
                </select>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <label className="mb-2 block text-sm font-medium">Resolution</label>
                <select className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none">
                  <option>1920x1080 (Full HD)</option>
                  <option>1280x720 (HD)</option>
                  <option>3840x2160 (4K)</option>
                </select>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <label className="mb-2 block text-sm font-medium">Bitrate</label>
                <select className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none">
                  <option>8 Mbps</option>
                  <option>12 Mbps</option>
                  <option>16 Mbps</option>
                </select>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
