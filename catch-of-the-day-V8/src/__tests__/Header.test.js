import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders Header with tagline', () => {
  render(<Header tagline="Fresh Seafood Market" />);
  
  // Check if the tagline is rendered
  expect(screen.getByText(/Fresh Seafood Market/i)).toBeInTheDocument();
});
