import Dexie, { Table } from 'dexie'
import type { Project, Clip } from '../types'

export class VideoEditorDB extends Dexie {
  projects!: Table<Project, string>
  clips!: Table<Clip, string>

  constructor() {
    super('VideoEditorDB')
    this.version(1).stores({
      projects: 'id, createdAt, updatedAt',
      clips: 'id, &projectId'
    })
  }
}

export const db = new VideoEditorDB()

// Database operations
export const dbOps = {
  // Projects
  async getProject(id: string) {
    return await db.projects.get(id)
  },

  async getAllProjects() {
    return await db.projects.toArray()
  },

  async createProject(project: Project) {
    return await db.projects.add(project)
  },

  async updateProject(id: string, updates: Partial<Project>) {
    return await db.projects.update(id, {
      ...updates,
      updatedAt: new Date()
    })
  },

  async deleteProject(id: string) {
    // Delete associated clips
    await db.clips.bulkDelete(
      (await db.clips.where('projectId' as any).equals(id).primaryKeys())
    )
    // Delete project
    return await db.projects.delete(id)
  },

  // Clips
  async getClip(id: string) {
    return await db.clips.get(id)
  },

  async getProjectClips(projectId: string) {
    return await db.clips.where('projectId' as any).equals(projectId).toArray()
  },

  async addClip(clip: Clip) {
    return await db.clips.add(clip)
  },

  async updateClip(id: string, updates: Partial<Clip>) {
    return await db.clips.update(id, updates)
  },

  async deleteClip(id: string) {
    return await db.clips.delete(id)
  },

  async bulkAddClips(clips: Clip[]) {
    return await db.clips.bulkAdd(clips)
  }
}
