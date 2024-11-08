import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Fish from '../components/Fish';

test('renders Fish component and adds a fish to order', () => {
  const details = {
    name: 'Salmon',
    price: 1000,
    status: 'available',
    desc: 'Delicious',
    image: 'image.jpg',
  };
  const addToOrder = jest.fn();
  render(<Fish details={details} addToOrder={addToOrder} index="fish1" />);

  // Check if the fish name is rendered
  expect(screen.getByText(/Salmon/i)).toBeInTheDocument();

  // Simulate clicking the "Add To Order" button
  fireEvent.click(screen.getByText(/Add To Order/i));

  // Check that addToOrder was called with the correct index
  expect(addToOrder).toHaveBeenCalledWith('fish1');
});
