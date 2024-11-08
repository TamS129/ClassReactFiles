import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

// Mock the Firebase base object
const base = {
  syncState: jest.fn(),
  removeBinding: jest.fn(),
};

test('renders App component without crashing', () => {
  // Mock match object with params
  const match = {
    params: {
      storeId: 'testStoreId',
    },
  };

  const { queryByText } = render(<App match={match} base={base} />);

  // Test for individual parts of the text
  expect(queryByText(/Catch/i)).toBeInTheDocument();
  expect(queryByText(/Of/i)).toBeInTheDocument();
  expect(queryByText(/The/i)).toBeInTheDocument();
  expect(queryByText(/Day/i)).toBeInTheDocument();
});
