import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FPTI app', () => {
  render(<App />);
  const linkElement = screen.getByText(/FPTI/i);
  expect(linkElement).toBeInTheDocument();
});
