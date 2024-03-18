import React, { useState } from 'react';
import Modal, { Heading } from '../Modal/Modal'; 
import Button from '../Button';
import {ModalCont} from '../Content/ModalCont';

import { styled } from '../../stitches.config';

const ModalContentRap = styled("div", {
  position: "relative",
  borderRadius: "6px",
  backgroundColor: "white",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "16px"
});

export const ModalClose = styled("div", {
  display: "flex",
  margin: "20px",
  columnGap: "12px",
  justifyContent: "flex-end",
});

export const ActionDiv = styled("div", {
  display: "flex",
  margin: "20px",
  columnGap: "12px",
  justifyContent: "flex-end",
});

export const Description = styled("p", {
  color: "$grey300",
  margin: "12px 0 20px"
});

const ModalPage = () => {
  const [open, setOpen] = useState(false);

  const heading = "Terms and Conditions";

  return (
    <Modal 
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
