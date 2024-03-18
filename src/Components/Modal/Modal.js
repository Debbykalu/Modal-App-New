import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useFocusTrap from '../../hook/useFosusTrap';
import Button from '../Button';
import { styled } from '../../stitches.config';


export const ModalWrapper = styled("div", {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  zIndex: 200,
  width: "inherit",
  outline: 0,
  background: '#ffffff',
  margin: 'auto 30px',
  width: '40%',
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
const ModalContent = styled("div", {
  padding: "16px"
});


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

  const [modalRef, handleKeyDown] = useFocusTrap()
  const lastFocusedElement = useRef(null)

  const headingId = "modal-heading"
  const descriptionId = "modal-description"

  // ENHANCEMENT Move useEffect into custom useModal hook
  useEffect(() => {
    const closeOnEscapePress = event => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      // prevent overflow
      document.body.style.overflow = "hidden"

      // add escape key listener
      document.addEventListener("keydown", closeOnEscapePress)

      // focus first valid element in modal
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (focusableElements.length > 0) {
          // store last focused element
          lastFocusedElement.current = document.activeElement

          // focus first valid element in modal
          focusableElements[0].focus()
        }
      }
    } else {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", closeOnEscapePress)
    }

    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", closeOnEscapePress)

      // refocus last focused element
      if (lastFocusedElement.current instanceof HTMLElement) {
        lastFocusedElement.current.focus()
      }
    } // Add semicolon here
  }, [isOpen, setIsOpen, modalRef])

  // Return modal using ReactDOM.createPortal
return(
  <>
  {/* ENHANCEMENT Allow custom button be passed in */}
  <Button color="purple" onClick={() => setIsOpen(true)}>{triggerText}</Button>
      {isOpen &&
        createPortal(
  <> 
  <ModalOverlay
  data-testid="modal-overlay"
  onClick={() => { setIsOpen(false)}}
/>
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
  )}
  </>
)
}

export default Modal;
