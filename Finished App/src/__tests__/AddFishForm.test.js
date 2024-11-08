import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddFishForm from '../components/AddFishForm';

test('renders AddFishForm and submits a new fish', () => {
  const addFish = jest.fn();
  render(<AddFishForm addFish={addFish} />);

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Salmon' } });
  fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '1000' } });
  fireEvent.change(screen.getByPlaceholderText('Image'), { target: { value: 'image.jpg' } });
  fireEvent.change(screen.getByPlaceholderText('Desc'), { target: { value: 'Delicious' } });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'available' } });

  // Submit the form
  fireEvent.submit(screen.getByText('+ Add Fish'));

  // Check that addFish was called with the right data
  expect(addFish).toHaveBeenCalledWith({
    name: 'Salmon',
    price: 1000,
    status: 'available',
    desc: 'Delicious',
    image: 'image.jpg',
  });
});
