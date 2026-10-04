import { useEffect, useRef, useCallback } from 'react'
import { Application, Assets, Sprite } from 'pixi.js'

interface PixiCanvasOptions {
  width?: number
  height?: number
  backgroundColor?: number
}

export const usePixiCanvas = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: PixiCanvasOptions = {}
) => {
  const appRef = useRef<Application | null>(null)
  const isInitialized = useRef(false)

  const width = options.width || 960
  const height = options.height || 540
  const backgroundColor = options.backgroundColor || 0x0f172a

  useEffect(() => {
    if (!containerRef.current || isInitialized.current) return

    const initPixi = async () => {
      try {
        const app = new Application()
        await app.init({
          width,
          height,
          backgroundColor,
          antialias: true,
          resolution: window.devicePixelRatio || 1
        })

        containerRef.current?.appendChild(app.canvas)
        appRef.current = app
        isInitialized.current = true
      } catch (error) {
        console.error('Failed to initialize PixiJS:', error)
      }
    }

    initPixi()

    return () => {
      if (appRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(appRef.current.canvas)
          appRef.current.destroy()
          appRef.current = null
          isInitialized.current = false
        } catch (error) {
          console.error('Error cleaning up PixiJS:', error)
        }
      }
    }
  }, [width, height, backgroundColor])

  const addSprite = useCallback(
    (texture: any, x = 0, y = 0) => {
      if (!appRef.current) return null
      const sprite = new Sprite(texture)
      sprite.position.set(x, y)
      appRef.current.stage.addChild(sprite)
      return sprite
    },
    []
  )

  const clearStage = useCallback(() => {
    if (!appRef.current) return
    appRef.current.stage.removeChildren()
  }, [])

  const resizeCanvas = useCallback((newWidth: number, newHeight: number) => {
    if (!appRef.current) return
    appRef.current.canvas.width = newWidth
    appRef.current.canvas.height = newHeight
    appRef.current.renderer.resize(newWidth, newHeight)
  }, [])

  return {
    app: appRef.current,
    addSprite,
    clearStage,
    resizeCanvas
  }
}
