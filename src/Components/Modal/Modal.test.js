import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from 'jest-axe';
import Modal from './Modal';

expect.extend(toHaveNoViolations);

const testModalContent = {
  triggerText: 'open modal',
  content: {
    text: 'test content',
    buttonOne: 'test content button 1',
    buttonTwo: 'test content button 2',
    buttonThree: 'test content button 3',
  },
};

const TestModal = ({ open: isOpen = false }) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <Modal
      isOpen={open}
      setIsOpen={setOpen}
      triggerText={testModalContent.triggerText}
      heading={testModalContent.heading}
      description={testModalContent.description}
      content={
        <>
          <p>{testModalContent.content.text}</p>
          <button>{testModalContent.content.buttonOne}</button>
          <button>{testModalContent.content.buttonTwo}</button>
          <button>{testModalContent.content.buttonThree}</button>
        </>
      }
    />
  );
};

describe('TestModal', () => {
  it('only trigger button visible when not open', () => {
    render(<TestModal />);
    const triggerButton = screen.getByRole('button', {
      name: /open modal/i,
    });
    expect(triggerButton).toBeInTheDocument();

    const modalHeading = screen.queryByRole('heading', {
      name: /test heading/i,
    });
    expect(modalHeading).not.toBeInTheDocument();

    const modalContent = screen.queryByText('test content');
    expect(modalContent).not.toBeInTheDocument();
  });
  
  it("should not violate any accessibility rules", async () => {
    const { container } = render(<TestModal open />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should focus the first valid element when opened", () => {
    render(<TestModal open />);

    const modalContentButtonOne = screen.getByRole("button", {
      name: /test content button 1/i
    });

    expect(modalContentButtonOne).toHaveFocus();
  });
  it("should not violate any accessibility rules", async () => {
    const { container } = render(<TestModal open />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("should focus the first valid element when opened", () => {
    render(<TestModal open />)

    const modalContentButtonOne = screen.getByRole("button", {
      name: /test content button 1/i
    })

    expect(modalContentButtonOne).toHaveFocus()
  })
});




  