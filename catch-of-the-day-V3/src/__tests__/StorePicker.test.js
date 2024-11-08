import React from 'react';
import { render, screen } from '@testing-library/react';
import StorePicker from '../components/StorePicker';

test('renders StorePicker form', () => {
  render(<StorePicker />);
  
  // Check if the form elements are rendered
  //expect(screen.getByText(/Please Enter A Store/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Store Name/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Visit Store/i })).toBeInTheDocument();
});
