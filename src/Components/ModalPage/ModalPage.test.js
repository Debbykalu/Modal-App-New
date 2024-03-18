import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import ModalPage from "./ModalPage"


expect.extend(toHaveNoViolations);

describe("ModalPage", () => {
    it("can click button to open modal", () => {
      render(<ModalPage />);
      const triggerButton = screen.getByRole("button", {
        name: /Click Here/i
      });
      userEvent.click(triggerButton);
  
      const modalHeading = screen.getByRole("heading", {
        name: /Terms and conditions/i
      });
      expect(modalHeading).toBeInTheDocument();
  
      const modalDescription = screen.getByText(
       "You will need to agree to our terms and conditions All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
      );
      expect(modalDescription).toBeInTheDocument();
    });
  });  

  describe("when opened", () => {
    let container;
  
    beforeEach(() => {
      const { container: renderedContainer } = render(<ModalPage />);
      container = renderedContainer;
    });
  
    it("should open the modal when 'Click Here' button is clicked", () => {
      const triggerButton = screen.getByRole("button", {
        name: /Click Here/i,
      });
      userEvent.click(triggerButton);
    });
  });
  describe("when opened", () => {
    let container;
  
    beforeEach(() => {
      const { container: renderedContainer } = render(<ModalPage />)
      container = renderedContainer
      const triggerButton = screen.getByRole("button", {
        name: /Click Here/i
      })
      userEvent.click(triggerButton)
    })
  
    it("should not violate any accessibility rules", async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  
    it.each(["I Agree", "Don't Agree"])(
      "should exit with %s button press",
      buttonName => {
        const actionBtn = screen.getByRole("button", {
          name: buttonName
        })
        userEvent.click(actionBtn)
        const modalHeading = screen.queryByRole("heading", {
          name: /Terms and Conditions/i
        })
        expect(modalHeading).not.toBeInTheDocument()
      }
    )
  })
  describe("when opened", () => {
    let container
  
    beforeEach(() => {
      const { container: renderedContainer } = render(<ModalPage />)
      container = renderedContainer
      const triggerButton = screen.getByRole("button", {
        name: /Click Here/i
      })
      userEvent.click(triggerButton)
    })
  
    it("should not violate any accessibility rules", async () => {
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
 
    
  
