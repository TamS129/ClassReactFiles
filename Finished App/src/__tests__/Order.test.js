import React from 'react';
import { render } from '@testing-library/react';
import Order from '../components/Order';

test('renders Order component', () => {
  const mockFishes = {
    fish1: { name: 'Tuna', price: 1000, status: 'available' },
    fish2: { name: 'Salmon', price: 1500, status: 'available' },
  };
  const mockOrder = { fish1: 1, fish2: 2 };

  const { getByText } = render(<Order fishes={mockFishes} order={mockOrder} />);

  // Check if the Order heading is rendered
  expect(getByText('Order')).toBeInTheDocument();
});
