import { Play, Pause, RotateCcw } from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'
import { useEditorStore } from '../store/editorStore'

export function Playback() {
  const isPlaying = useEditorStore((s) => s.isPlaying)
  const setIsPlaying = useEditorStore((s) => s.setIsPlaying)
  const currentTime = useEditorStore((s) => s.currentTime)
  const setCurrentTime = useEditorStore((s) => s.setCurrentTime)
  const clips = useEditorStore((s) => s.clips)

  const totalDuration = clips.reduce((sum, clip) => sum + clip.duration, 0)

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 transition flex items-center gap-2"
      >
        {isPlaying ? (
          <>
            <Pause className="h-4 w-4" />
            Pause
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            Play
          </>
        )}
      </button>

      <button className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm hover:bg-slate-800 transition">
        <RotateCcw className="h-4 w-4" />
      </button>

      <Slider.Root
        value={[currentTime]}
        max={totalDuration}
        min={0}
        step={0.1}
        className="flex-1 flex items-center"
        onValueChange={(value) => setCurrentTime(value[0])}
      >
        <Slider.Track className="relative h-1.5 flex-1 rounded-full bg-slate-700">
          <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full border border-blue-300 bg-white shadow hover:shadow-lg transition" />
      </Slider.Root>

      <span className="text-sm text-slate-400 whitespace-nowrap">
        {currentTime.toFixed(1)}s / {totalDuration}s
      </span>
    </div>
  )
}
