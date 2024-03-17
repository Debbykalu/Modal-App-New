import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import ModalPage from "./ModalPage";

describe('Modal', () => {
    it('does not render modal when isOpen is false', () => {
        render(
          <ModalPage isOpen={false} onCloseClick={() => {}}>
            <div>Modal Content</div>
          </ModalPage>
        );
      
        // Verify that the modal content is not rendered when isOpen is false
        expect(screen.queryByText('Modal Content')).toBeNull();
      });
      
});
