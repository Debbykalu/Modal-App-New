import { useCallback, useRef } from "react"

const useFocusTrap = () => {
  const containerRef = useRef(null)

  const handleKeyDown = useCallback(
    event => {
      if (event.key === "Tab" && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            event.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            event.preventDefault()
          }
        }
      }
    },
    [containerRef]
  )

  return [containerRef, handleKeyDown]
}

export default useFocusTrap
