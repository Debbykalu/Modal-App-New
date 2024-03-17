import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { styled } from '../../stitches.config'; // Import styled from Stitches config

// Create ModalWrapper component using Stitches
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
const ModalContentRap = styled("div", {
  padding: "16px"
});
export const ModalClose = styled("div", {
  display: "flex",
  margin: "20px",
  columnGap: "12px",
  justifyContent: "flex-end",
});


// Modal component
function Modal({ onCloseClick, children, actionButton}) {
  // Create a reference to the modal element
  const modalRef = useRef();

  // Function that handles Tab key navigation inside the modal
  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement = focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  // useEffect hook to handle key listeners
  useEffect(() => {
    const keyListener = (e) => {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, []);

  const keyListenersMap = new Map([[27, onCloseClick], [9, handleTabKey]]);

  // Return modal using ReactDOM.createPortal
 return ReactDOM.createPortal(
  <ModalOverlay onClick={onCloseClick}>
    <ModalWrapper 
      ref={modalRef} 
      aria-modal
      tabIndex={-1}
      role="dialog">
      <ModalContentRap>
        <ModalClose>
          <Button onClick={onCloseClick} color="purple">X</Button> 
        </ModalClose>
        {children}
        {actionButton}
      </ModalContentRap>
    </ModalWrapper>
  </ModalOverlay>,
  document.body
  );
}

export default Modal;
