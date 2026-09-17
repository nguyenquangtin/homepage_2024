import { useEffect, useState } from 'react'

// True while the referenced element intersects the viewport. Starts true so
// SSR and the first client paint match; stays true where IntersectionObserver
// is unavailable (animations simply never pause there).
export const useInViewport = (ref, rootMargin = '0px') => {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
