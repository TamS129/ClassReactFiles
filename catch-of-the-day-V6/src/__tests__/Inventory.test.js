import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Inventory from '../components/Inventory';

test('renders Inventory component and interacts with buttons', () => {
  const addFish = jest.fn();
  const loadSampleFishes = jest.fn();
  render(<Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} />);

  // Check if the "Load Sample Fishes" button is rendered
  expect(screen.getByText(/Load Sample Fishes/i)).toBeInTheDocument();

  // Simulate clicking the "Load Sample Fishes" button
  fireEvent.click(screen.getByText(/Load Sample Fishes/i));

  // Check that loadSampleFishes was called
  expect(loadSampleFishes).toHaveBeenCalled();
});
