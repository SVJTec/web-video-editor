import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Clip, Project, ProjectSettings, EditorSettings } from '../types'

interface EditorState {
  // Project
  currentProject: Project | null
  projects: Project[]
  setCurrentProject: (project: Project | null) => void
  addProject: (project: Project) => void
  removeProject: (id: string) => void
  updateProject: (id: string, updates: Partial<Project>) => void

  // Clips
  clips: Clip[]
  selectedClip: Clip | null
  addClip: (clip: Clip) => void
  removeClip: (id: string) => void
  selectClip: (id: string | null) => void
  updateClip: (id: string, updates: Partial<Clip>) => void
  reorderClips: (fromIndex: number, toIndex: number) => void

  // Editor Settings
  settings: EditorSettings
  updateSettings: (updates: Partial<EditorSettings>) => void

  // UI State
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  currentTime: number
  setCurrentTime: (time: number) => void
  showSettings: boolean
  setShowSettings: (show: boolean) => void
}

const defaultSettings: EditorSettings = {
  theme: 'dark',
  zoom: 1,
  snapToGrid: false,
  gridSize: 10,
  playbackSpeed: 1
}

const defaultProjectSettings: ProjectSettings = {
  fps: 24,
  bitrate: '12 Mbps',
  format: 'H.264',
  width: 1920,
  height: 1080
}

export const useEditorStore = create<EditorState>()(
  immer((set) => ({
    currentProject: null,
    projects: [],
    clips: [],
    selectedClip: null,
    settings: defaultSettings,
    isPlaying: false,
    currentTime: 0,
    showSettings: false,

    setCurrentProject: (project) =>
      set((state) => {
        state.currentProject = project
        state.clips = project?.clips || []
      }),

    addProject: (project) =>
      set((state) => {
        state.projects.push(project)
      }),

    removeProject: (id) =>
      set((state) => {
        state.projects = state.projects.filter((p) => p.id !== id)
        if (state.currentProject?.id === id) {
          state.currentProject = null
        }
      }),

    updateProject: (id, updates) =>
      set((state) => {
        const project = state.projects.find((p) => p.id === id)
        if (project) {
          Object.assign(project, updates, { updatedAt: new Date() })
        }
        if (state.currentProject?.id === id) {
          Object.assign(state.currentProject, updates, { updatedAt: new Date() })
        }
      }),

    addClip: (clip) =>
      set((state) => {
        state.clips.push(clip)
        if (state.currentProject) {
          state.currentProject.clips.push(clip)
        }
      }),

    removeClip: (id) =>
      set((state) => {
        state.clips = state.clips.filter((c) => c.id !== id)
        if (state.currentProject) {
          state.currentProject.clips = state.currentProject.clips.filter(
            (c) => c.id !== id
          )
        }
        if (state.selectedClip?.id === id) {
          state.selectedClip = null
        }
      }),

    selectClip: (id) =>
      set((state) => {
        if (id) {
          state.selectedClip = state.clips.find((c) => c.id === id) || null
        } else {
          state.selectedClip = null
        }
        state.clips = state.clips.map((c) => ({
          ...c,
          selected: c.id === id
        }))
      }),

    updateClip: (id, updates) =>
      set((state) => {
        const clip = state.clips.find((c) => c.id === id)
        if (clip) {
          Object.assign(clip, updates)
        }
        if (state.currentProject) {
          const projectClip = state.currentProject.clips.find((c) => c.id === id)
          if (projectClip) {
            Object.assign(projectClip, updates)
          }
        }
        if (state.selectedClip?.id === id) {
          state.selectedClip = { ...state.selectedClip, ...updates }
        }
      }),

    reorderClips: (fromIndex, toIndex) =>
      set((state) => {
        const [removed] = state.clips.splice(fromIndex, 1)
        state.clips.splice(toIndex, 0, removed)
        if (state.currentProject) {
          const [projectRemoved] = state.currentProject.clips.splice(fromIndex, 1)
          state.currentProject.clips.splice(toIndex, 0, projectRemoved)
        }
      }),

    updateSettings: (updates) =>
      set((state) => {
        Object.assign(state.settings, updates)
      }),

    setIsPlaying: (playing) =>
      set((state) => {
        state.isPlaying = playing
      }),

    setCurrentTime: (time) =>
      set((state) => {
        state.currentTime = time
      }),

    setShowSettings: (show) =>
      set((state) => {
        state.showSettings = show
      })
  }))
)
