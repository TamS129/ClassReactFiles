import React from 'react';
import { render } from '@testing-library/react';
import Inventory from '../components/Inventory';

test('renders Inventory component', () => {
  const mockFishes = {
    fish1: { name: 'Tuna', price: 1000, status: 'available', desc: 'Fresh Tuna', image: 'image.jpg' },
    fish2: { name: 'Salmon', price: 1500, status: 'available', desc: 'Fresh Salmon', image: 'image.jpg' },
  };

  const { getByText } = render(<Inventory fishes={mockFishes} />);

  // Check if the Inventory heading is rendered
  expect(getByText('Inventory')).toBeInTheDocument();
  // Check if the "Load Sample Fishes" button is rendered
  expect(getByText('Load Sample Fishes')).toBeInTheDocument();
});
