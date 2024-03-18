import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useFocusTrap from '../../hook/useFosusTrap'; // Importing custom hook for focus trapping
import Button from '../Button'; // Importing Button component
import { styled } from '../../stitches.config'; // Importing styled function from Stitches config

// Styling for ModalWrapper component using Stitches
export const ModalWrapper = styled("div", {
  position: "fixed",
  top: "50%",
  left: "43%",
  transform: " translate(-50%, -50%)",
  zIndex: 200,
  outline: 0,
  background: '#ffffff',
  margin: 'auto 30px',
});

// Create ModalOverlay component using Stitches
const ModalOverlay = styled("div", {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  background: "$backgroundOverlay", // Use theme variable for background color
  zIndex: 100
});

// Styling for ModalContent component using Stitches
const ModalContent = styled("div", {
  padding: "16px"
});

// Styling for Heading component using Stitches
export const Heading = styled("h2", {
  margin: 0
});

// Modal component
function Modal({ 
  isOpen,
  setIsOpen,
  heading,
  triggerText,
  content}) {
  // Initialize custom hook for focus trapping
  const [modalRef, handleKeyDown] = useFocusTrap()
  const lastFocusedElement = useRef(null)

  const headingId = "modal-heading"
  const descriptionId = "modal-description"

  // Effect to handle modal opening and closing, focus trapping, and keyboard events
  useEffect(() => {
    // Function to close modal when Escape key is pressed
    const closeOnEscapePress = event => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"

      // Add event listener for Escape key
      document.addEventListener("keydown", closeOnEscapePress)

      // Focus first valid element in modal when opened
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (focusableElements.length > 0) {
          // Store last focused element
          lastFocusedElement.current = document.activeElement

          // Focus first valid element in modal
          focusableElements[0].focus()
        }
      }
    } else {
      // Reset body overflow style when modal is closed
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", closeOnEscapePress)
    }

    // Cleanup function to remove event listener and refocus last focused element
    return () => {
      document.body.style.overflow = "unset" // Reset body overflow style
      document.removeEventListener("keydown", closeOnEscapePress) // Remove event listener

      // Refocus last focused element if it exists
      if (lastFocusedElement.current instanceof HTMLElement) {
        lastFocusedElement.current.focus()
      }
    }; // Add semicolon here
  }, [isOpen, setIsOpen, modalRef])

  // Return modal using ReactDOM.createPortal
  return (
    <>
      {/* Button to trigger modal */}
      <Button color="purple" onClick={() => setIsOpen(true)}>{triggerText}</Button>
      {/* Render modal overlay and modal content when modal is open */}
      {isOpen &&
        createPortal(
          <>
            <ModalOverlay data-testid="modal-overlay" onClick={() => { setIsOpen(false)}} />
            <ModalWrapper 
              aria-modal
              aria-labelledby={headingId}
              aria-describedby={descriptionId}
              tabIndex={-1}
              role="dialog"
              ref={modalRef}
              onKeyDown={handleKeyDown}
            >
              <ModalContent>
                {content}
              </ModalContent>
            </ModalWrapper>
          </>,
          document.body
        )
      }
    </>
  );
}

export default Modal;
