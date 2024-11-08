import React from 'react';
import { render } from '@testing-library/react';
import Inventory from '../components/Inventory';

test('renders Inventory component', () => {
  const { getByText } = render(<Inventory storeId="testStore" />);

  // Check if the Inventory Login heading is rendered
  expect(getByText('Inventory Login')).toBeInTheDocument();

  // Check if the "Log In With GitHub" button is rendered
  expect(getByText('Log In With GitHub')).toBeInTheDocument();

  // Check if the "Log In With Twitter" button is rendered
  expect(getByText('Log In With Twitter')).toBeInTheDocument();

  // Check if the "Log In With Facebook" button is rendered
  expect(getByText('Log In With Facebook')).toBeInTheDocument();
});
