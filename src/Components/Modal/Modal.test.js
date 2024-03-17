import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import Modal from "./Modal";

describe('Modal', () => {
    it('renders children and actionButton', () => {
      const onCloseClick = jest.fn();
      render(
        <Modal onCloseClick={onCloseClick} actionButton={<button>Action</button>}>
          <div>Modal Content</div>
        </Modal>
      );
  
      // Verify that modal content and actionButton are rendered
      expect(screen.getByText('Modal Content')).toBeTruthy(); // Use toBeTruthy matcher
      expect(screen.getByText('Action')).toBeTruthy(); // Use toBeTruthy matcher
    });
  });
  

  