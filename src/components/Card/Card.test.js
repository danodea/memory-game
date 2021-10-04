import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from './Card';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should load without props', () => {
  act(() => {
    render(<Card />, container);
  })
});

it('should display its name when it is selected', () => {
    act(() => {
        render(
        <Card 
            name={'Dan'} 
            isSelected={true}
        />, container);
      })

      let name = document.querySelector('.name');
      expect(name.textContent).toBe('Dan');
})