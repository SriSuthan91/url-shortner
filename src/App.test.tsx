import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders url shortner', () => {
  render(<App />);
  const linkElement = screen.getByText(/URL SHORTNER/i);
  expect(linkElement).toBeInTheDocument();
});
