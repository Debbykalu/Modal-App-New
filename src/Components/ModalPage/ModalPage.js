import React, { useState } from 'react';
import Modal from '../Modal/Modal'; 
import Button from '../Button';
import { Content } from '../Content/Content';
import { styled } from '../../stitches.config';

const ModalContent = styled("div", {
  position: "relative",
  borderRadius: "6px",
  backgroundColor: "white",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "16px"
});

export const ActionDiv = styled("div", {
  display: "flex",
  margin: "20px",
  columnGap: "12px",
  justifyContent: "flex-end",
});

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClick = () => {
    setIsOpen(true);
  };

  const closeModalClick = () => {
    setIsOpen(false);
  };

  const actionButton = (
          <ActionDiv>
            <Button color="green" onCloseClick={closeModalClick}>
             I Agree
            </Button>
          </ActionDiv>
  )
  const modal = (
    <Modal onCloseClick={closeModalClick} actionButton={actionButton}>
      <ModalContent>
        <Content />
      </ModalContent>
    </Modal>
  );

  return (
    <div className="relative">
      <Button color="green" onClick={handleModalClick}>Click Here</Button>
      {isOpen && modal}
    </div>
  );
}

export default ModalPage;
