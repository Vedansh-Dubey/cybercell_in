import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 },
    )

    function observeNew() {
      requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach(el => io.observe(el))
      })
    }

    observeNew()

    const mo = new MutationObserver(observeNew)
    mo.observe(document.body, { childList: true, subtree: true })

    // Safety net: force-reveal anything still hidden after data loads
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach(el => {
        const rect = el.getBoundingClientRect()
        // Reveal if element is anywhere near the visible area
        if (rect.top < window.innerHeight + 200) {
          el.classList.add('in')
        }
      })
    }, 1500)

    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(timer)
    }
  }, [])
}
