import { useRef, useEffect } from 'react'
import { Layers3 } from 'lucide-react'
import { usePixiCanvas } from '../hooks'

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { app } = usePixiCanvas(containerRef, {
    width: 960,
    height: 540,
    backgroundColor: 0x0f172a
  })

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Layers3 className="h-4 w-4" />
          Preview Canvas
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800 transition">
            Fit
          </button>
          <button className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800 transition">
            100%
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex-1 bg-gradient-to-br from-slate-900 to-slate-950"
        style={{ minHeight: '440px' }}
      />
    </div>
  )
}
