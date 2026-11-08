import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Muted inline playback can start without a click. Load only on entry, and stop
// work when the video leaves the scroll viewport or the tab is hidden.
export default function useAmbientVideo(videoRef) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let visible = false
    const sync = () => {
      if (visible && !document.hidden) {
        video.muted = true
        if (!video.getAttribute('src')) video.src = video.dataset.src
        video.play().catch(() => {})
      } else video.pause()
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    const refresh = () => ScrollTrigger.refresh()
    observer.observe(video)
    video.addEventListener('loadedmetadata', refresh)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      video.removeEventListener('loadedmetadata', refresh)
      document.removeEventListener('visibilitychange', sync)
      video.pause()
    }
  }, [videoRef])
}
