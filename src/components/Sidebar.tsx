import { Plus, Trash2 } from 'lucide-react'
import { useEditorStore } from '../store/editorStore'
import type { Clip } from '../types'

export function Sidebar() {
  const clips = useEditorStore((s) => s.clips)
  const selectedClip = useEditorStore((s) => s.selectedClip)
  const selectClip = useEditorStore((s) => s.selectClip)
  const removeClip = useEditorStore((s) => s.removeClip)

  const effects = [
    { id: '1', label: 'Color Grade', icon: '🎨' },
    { id: '2', label: 'Blur', icon: '📷' },
    { id: '3', label: 'Glow', icon: '✨' },
    { id: '4', label: 'Sharpen', icon: '🔍' }
  ]

  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950/60 p-4 overflow-y-auto">
      {/* Clips Library */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Library</p>
          <button className="rounded-lg border border-slate-700 bg-slate-900 p-1.5 text-sm hover:bg-slate-800 transition">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2">
          {clips.length === 0 ? (
            <p className="text-sm text-slate-400">No clips yet</p>
          ) : (
            clips.map((clip) => (
              <div
                key={clip.id}
                className="flex items-center justify-between rounded-xl border px-3 py-2 transition cursor-pointer group"
                onClick={() => selectClip(clip.id)}
                style={{
                  borderColor: selectedClip?.id === clip.id ? '#3b82f6' : '#1e293b',
                  backgroundColor:
                    selectedClip?.id === clip.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(15, 23, 42, 0.5)'
                }}
              >
                <div className="flex-1">
                  <p
                    className="text-sm font-medium"
                    style={{
                      color:
                        selectedClip?.id === clip.id ? '#dbeafe' : '#cbd5e1'
                    }}
                  >
                    {clip.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{clip.duration}s</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeClip(clip.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Effects Panel */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Effects</p>
        <div className="space-y-2">
          {effects.map((effect) => (
            <div
              key={effect.id}
              className="flex items-center justify-between rounded-lg bg-slate-800/60 px-2 py-2 text-sm hover:bg-slate-700/60 transition cursor-pointer"
            >
              <span>{effect.label}</span>
              <span>{effect.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
