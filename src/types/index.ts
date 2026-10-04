export type Clip = {
  id: string
  name: string
  duration: number
  selected: boolean
  startTime?: number
  endTime?: number
  effects?: Effect[]
}

export type Effect = {
  id: string
  type: 'colorGrade' | 'blur' | 'glow' | 'sharpen' | 'opacity' | 'scale'
  intensity: number
  enabled: boolean
}

export type Project = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  clips: Clip[]
  settings: ProjectSettings
}

export type ProjectSettings = {
  fps: number
  bitrate: string
  format: string
  width: number
  height: number
}

export type Theme = 'dark' | 'light'

export type EditorSettings = {
  theme: Theme
  zoom: number
  snapToGrid: boolean
  gridSize: number
  playbackSpeed: number
}
