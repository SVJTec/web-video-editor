import * as Tabs from '@radix-ui/react-tabs'
import {
  Header,
  Sidebar,
  Canvas,
  Timeline,
  Inspector,
  Playback,
  SettingsPanel
} from './components'
import { useEditorStore } from './store/editorStore'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex h-screen flex-col">
        <Header />

        <div className="mx-auto flex w-full max-w-7xl flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex flex-1 flex-col">
            {/* Playback Controls */}
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 gap-4">
              <Tabs.Root defaultValue="timeline" className="flex items-center">
                <Tabs.List className="flex gap-2 rounded-lg border border-slate-800 bg-slate-900 p-1">
                  <Tabs.Trigger
                    value="preview"
                    className="rounded-md px-3 py-2 text-sm text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100 transition"
                  >
                    Preview
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="timeline"
                    className="rounded-md px-3 py-2 text-sm text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100 transition"
                  >
                    Timeline
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>

              <Playback />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[1.7fr_0.9fr]">
                {/* Canvas */}
                <Canvas />

                {/* Inspector */}
                <Inspector />
              </div>

              {/* Timeline */}
              <Timeline />
            </div>
          </main>
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel />
    </div>
  )
}
