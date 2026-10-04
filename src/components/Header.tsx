import { Film, Upload, Download } from 'lucide-react'
import { useEditorStore } from '../store/editorStore'

export function Header() {
  const currentProject = useEditorStore((s) => s.currentProject)
  const setShowSettings = useEditorStore((s) => s.setShowSettings)

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Studio</p>
            <h1 className="text-lg font-semibold">
              {currentProject?.name || 'Web Video Editor'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm hover:bg-slate-800 transition">
            <Upload className="mr-2 inline h-4 w-4" />
            Import
          </button>
          <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 transition">
            <Download className="mr-2 inline h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm hover:bg-slate-800 transition"
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  )
}
