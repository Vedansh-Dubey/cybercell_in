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
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach(el => io.observe(el))
    }

    observeNew()

    // Pick up elements added after data loads (blog cards, news cards, etc.)
    const mo = new MutationObserver(observeNew)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, []) // run once on mount only
}
