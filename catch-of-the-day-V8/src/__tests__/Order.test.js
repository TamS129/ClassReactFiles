import React from 'react';
import { render, screen } from '@testing-library/react';
import Order from '../components/Order';

test('renders Order component and calculates total', () => {
  const fishes = {
    fish1: { name: 'Salmon', price: 1000, status: 'available' },
    fish2: { name: 'Tuna', price: 2000, status: 'available' },
  };
  const order = {
    fish1: 2, // 2 lbs of Salmon
    fish2: 1, // 1 lb of Tuna
  };
  render(<Order fishes={fishes} order={order} />);

  // Check if the order items are rendered
  expect(screen.getByText(/2 lbs Salmon/i)).toBeInTheDocument();
  expect(screen.getByText(/1 lbs Tuna/i)).toBeInTheDocument();

  // Check if the total price is correctly calculated
  expect(screen.getByText(/\$40.00/i)).toBeInTheDocument();
});
