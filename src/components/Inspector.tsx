import * as Slider from '@radix-ui/react-slider'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useEditorStore } from '../store/editorStore'

export function Inspector() {
  const selectedClip = useEditorStore((s) => s.selectedClip)
  const settings = useEditorStore((s) => s.settings)
  const updateSettings = useEditorStore((s) => s.updateSettings)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-200">Inspector</p>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800 transition">
                AI Enhance
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200">
              Smart improvements for clips
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <div className="space-y-5">
        {/* Zoom Slider */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Zoom
          </label>
          <Slider.Root
            value={[settings.zoom]}
            max={2}
            min={0.5}
            step={0.1}
            className="relative flex h-5 w-full touch-none items-center"
            onValueChange={(value) => updateSettings({ zoom: value[0] })}
          >
            <Slider.Track className="relative h-1.5 flex-1 rounded-full bg-slate-700">
              <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
            </Slider.Track>
            <Slider.Thumb className="block h-4 w-4 rounded-full border border-blue-300 bg-white shadow hover:shadow-lg transition" />
          </Slider.Root>
        </div>

        {/* Selected Clip Info */}
        {selectedClip && (
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
              Clip Info
            </label>
            <div className="rounded-lg bg-slate-800/60 p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Name</span>
                <span className="font-medium">{selectedClip.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duration</span>
                <span className="font-medium">{selectedClip.duration}s</span>
              </div>
            </div>
          </div>
        )}

        {/* Project Properties */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            Properties
          </p>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>FPS</span>
              <span>24</span>
            </div>
            <div className="flex justify-between">
              <span>Bitrate</span>
              <span>12 Mbps</span>
            </div>
            <div className="flex justify-between">
              <span>Format</span>
              <span>H.264</span>
            </div>
            <div className="flex justify-between">
              <span>Resolution</span>
              <span>1920x1080</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
