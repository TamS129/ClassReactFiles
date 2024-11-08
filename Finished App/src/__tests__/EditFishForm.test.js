import React from 'react';
import { render } from '@testing-library/react';
import EditFishForm from '../components/EditFishForm';

test('renders EditFishForm component', () => {
  const mockFish = {
    name: 'Tuna',
    price: 1000,
    status: 'available',
    desc: 'Fresh Tuna',
    image: 'image.jpg',
  };

  const { getByDisplayValue } = render(<EditFishForm fish={mockFish} />);

  // Check if the form fields are rendered with correct values
  expect(getByDisplayValue('Tuna')).toBeInTheDocument();
  expect(getByDisplayValue('1000')).toBeInTheDocument();
  expect(getByDisplayValue('Fresh Tuna')).toBeInTheDocument();
  expect(getByDisplayValue('image.jpg')).toBeInTheDocument();
});
