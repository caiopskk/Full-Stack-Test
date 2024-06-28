import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import FileUpload from '../components/FileUpload';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { CSVData } from '../types/csvData';
import App from '../App';

test('renders upload input', () => {
  render(<FileUpload onFileUpload={() => {}} />);
  const uploadInput = screen.getByLabelText(/upload CSV file/i);
  expect(uploadInput).not.toBeNull();
});

test('renders search bar', () => {
  render(<SearchBar onSearch={() => {}} data-testid="search-input" />);
  const searchBar = screen.getByPlaceholderText(/search/i);
  expect(searchBar).not.toBeNull();
});

test('renders upload input', () => {
  render(<FileUpload onFileUpload={() => {}} />);
  const uploadInput = screen.getByLabelText(/upload CSV file/i);
  expect(uploadInput).not.toBeNull();
});

test('renders search bar', () => {
  render(<SearchBar onSearch={() => {}} data-testid="search-input" />);
  const searchBar = screen.getByPlaceholderText(/search/i);
  expect(searchBar).not.toBeNull();
});

const testData: CSVData = {
  name: 'John Doe',
  city: 'New York',
  country: 'USA',
  favorite_sport: 'Basketball'
};

test('renders card component', () => {
  render(<Card data={testData} data-testid="info-card" />);
  const card = screen.getByTestId('info-card');
  expect(card).not.toBeNull();
  expect(screen.getByText(/John Doe/i)).not.toBeNull();
  expect(screen.getByText(/New York/i)).not.toBeNull();
  expect(screen.getByText(/USA/i)).not.toBeNull();
  expect(screen.getByText(/Basketball/i)).not.toBeNull();
});

test('search functionality', async () => {
  render(<App />);
  const searchBar = screen.getByPlaceholderText(/search/i);
  const testData = 'John Doe,New York,USA,Basketball';
  const file = new File(
    [`name,city,country,favorite_sport\n${testData}`],
    'test.csv',
    { type: 'text/csv' }
  );

  const uploadInput = screen.getByLabelText(/upload csv file/i);
  fireEvent.change(uploadInput, { target: { files: [file] } });

  await waitFor(() => expect(screen.getByText('File uploaded successfully')));

  fireEvent.change(searchBar, { target: { value: 'John' } });

  expect(await screen.findByText(/John Doe/i));
});

test('clear data functionality', async () => {
  render(<App />);
  const testData = 'John Doe,New York,USA,Basketball';
  const file = new File(
    [`name,city,country,favorite_sport\n${testData}`],
    'test.csv',
    { type: 'text/csv' }
  );

  const uploadInput = screen.getByLabelText(/upload csv file/i);
  fireEvent.change(uploadInput, { target: { files: [file] } });

  await waitFor(() => expect(screen.getByText('File uploaded successfully')));

  const clearButton = screen.getByText(/Clear Data/i);
  fireEvent.click(clearButton);

  await waitFor(() => expect(screen.getByText('Data cleared successfully')));
  expect(screen.getByText('No data available'));
});

test('clear data with no data to clear', async () => {
  render(<App />);
  const clearButton = screen.getByText(/Clear Data/i);
  fireEvent.click(clearButton);

  await waitFor(() => expect(screen.getByText('No data to clear')));
});
