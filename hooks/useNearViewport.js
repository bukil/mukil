import { useEffect, useState } from 'react'

export default function useNearViewport(ref, rootMargin = '0px') {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const target = ref.current
    if (!target) return
    if (!('IntersectionObserver' in window)) {
      setNear(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setNear(entry.isIntersecting)
    }, { rootMargin })
    observer.observe(target)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return near
}
