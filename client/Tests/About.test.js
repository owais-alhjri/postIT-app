import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import About from "../src/Components/About";
import React from "react"; 
describe("About", () => {
    it("should render the About component", () => {
      render(<About />);    // Render the About component in the virtual DOM provided by the testing library
      //Assertion: check if there is an h1 element 
      const aboutElement = screen.getByRole('heading', {level: 1})
      expect(aboutElement).toBeInTheDocument();
    });
        it("should have the image", () => {
      render(<About />);
      const image = screen.getByAltText('devimage')
      expect(image).toHaveClass('userImage');
    }); 
});
 
    