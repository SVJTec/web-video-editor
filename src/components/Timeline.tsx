import { Plus, Scissors } from 'lucide-react'
import { useEditorStore } from '../store/editorStore'

export function Timeline() {
  const clips = useEditorStore((s) => s.clips)
  const selectedClip = useEditorStore((s) => s.selectedClip)
  const selectClip = useEditorStore((s) => s.selectClip)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Scissors className="h-4 w-4" />
          Timeline
        </div>
        <button className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800 transition">
          <Plus className="mr-1 inline h-3 w-3" />
          Add Track
        </button>
      </div>

      <div className="flex h-24 items-center gap-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60 p-3">
        {clips.length === 0 ? (
          <p className="text-sm text-slate-400">No clips in timeline</p>
        ) : (
          clips.map((clip) => (
            <div
              key={clip.id}
              onClick={() => selectClip(clip.id)}
              className="flex h-full min-w-[140px] items-center justify-center rounded-lg border text-sm font-medium cursor-pointer transition hover:opacity-80"
              style={{
                borderColor: selectedClip?.id === clip.id ? '#3b82f6' : '#334155',
                backgroundColor:
                  selectedClip?.id === clip.id
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'rgb(30, 41, 59)'
              }}
            >
              {clip.name}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
