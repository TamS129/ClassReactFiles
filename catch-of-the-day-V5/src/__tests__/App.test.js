import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('renders App component', () => {
  const { container } = render(<App />);
  
  // Check if the App component renders child components correctly
  expect(container.querySelector('.catch-of-the-day')).toBeInTheDocument();
  // expect(container.querySelector('.menu')).toBeInTheDocument();
  // expect(container.querySelector('.order')).toBeInTheDocument();
});
