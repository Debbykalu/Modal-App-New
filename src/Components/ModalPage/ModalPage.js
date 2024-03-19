import React, { useState } from 'react';
import Modal, { Heading } from '../Modal/Modal'; 
import Button from '../Button';
import {ModalCont} from '../Content/ModalCont';

import { styled } from '../../stitches.config';

// Styling for the modal content wrapper
const ModalContentRap = styled("div", {
  position: "relative",
  borderRadius: "6px",
  backgroundColor: "white",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "16px"
});
// Styling for the close button
export const ModalClose = styled("div", {
  display: "flex",
  margin: "20px",
  columnGap: "12px",
  justifyContent: "flex-end",
});
//Styling for the action buttons
export const ActionDiv = styled("div", {
  display: "flex",
  margin: "20px",
  columnGap: "12px",
  justifyContent: "flex-end",
});
//Styling for the description text
export const Description = styled("p", {
  color: "$grey300",
  margin: "12px 0 20px"
});

const ModalPage = () => {
   // State to manage the modal open and close
  const [open, setOpen] = useState(false);
//Modal heading text
  const heading = "Terms and Conditions";

  return (
    <Modal 
    //destructuring of props from Modal component
       isOpen={open}
       setIsOpen={setOpen}
       triggerText="Click Here"
      content={
        <>
          <ModalContentRap>
              <ModalClose>
                <Button onClick={() => setOpen(false)} color="purple">X</Button> 
              </ModalClose>
              <Heading>
              {heading}
              </Heading>
              <Description >
              <ModalCont />
              </Description>
          </ModalContentRap>
          <ActionDiv>
              <Button color="green" onClick={() => setOpen(false)}>
                  I Agree
              </Button>
              <Button color="purple" onClick={() => setOpen(false)}>
                  Don't Agree
              </Button>
          </ActionDiv>
        </>
      }
    
    />
  );
}

export default ModalPage;
