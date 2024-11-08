import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App';

test('renders App component', () => {
  const { container } = render(<App />);
  
  // Check if the App component renders child components correctly
  expect(container.querySelector('.catch-of-the-day')).toBeInTheDocument();
  expect(container.querySelector('.menu')).toBeInTheDocument();
  expect(container.querySelector('.order')).toBeInTheDocument();
  expect(container.querySelector('.fishes')).toBeInTheDocument();
});

test('can add a fish to the inventory', () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  
  // Open the Inventory form and add a fish
  fireEvent.change(getByPlaceholderText(/Name/i), { target: { value: 'Salmon' } });
  fireEvent.change(getByPlaceholderText(/Price/i), { target: { value: '1000' } });
  fireEvent.change(getByPlaceholderText(/Image/i), { target: { value: 'image.jpg' } });
  fireEvent.change(getByPlaceholderText(/Desc/i), { target: { value: 'Fresh fish' } });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'available' } });

  // Submit the form to add the fish
  fireEvent.click(getByText('+ Add Fish'));

  // Check if the new fish was added to the inventory
  expect(screen.getByText(/Salmon/i)).toBeInTheDocument();
});

test('can load sample fishes', () => {
  const { getByText } = render(<App />);

  // Load sample fishes
  fireEvent.click(getByText(/Load Sample Fishes/i));

  // Check if sample fishes were loaded
  expect(screen.getByText(/Pacific Halibut/i)).toBeInTheDocument();
  expect(screen.getByText(/Lobster/i)).toBeInTheDocument();
});

test('can add a fish to the order', () => {
  const { getByText, getAllByText } = render(<App />);

  // Load sample fishes
  fireEvent.click(getByText(/Load Sample Fishes/i));

  // Add the first fish to the order
  fireEvent.click(getAllByText(/Add To Order/i)[0]);

  // Check if the order was updated
  expect(screen.getByText(/1 lbs Pacific Halibut/i)).toBeInTheDocument();
});
